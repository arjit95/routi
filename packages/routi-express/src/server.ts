import {
  BaseServer,
  ServerOptions,
  Route,
  GenericHandler,
  ParamInfo,
  Reply,
  NativeServer,
} from '@arjit95/routi-core';
import { MethodsImpl } from './methods';
import { ParamsImpl } from './params';
import Express from 'express';
import { RequestImpl } from './request';
import { ResponseImpl } from './response';
import http from 'http';
import https from 'https';

export class Server extends BaseServer {
  app: Express.Application;
  private params: ParamsImpl;
  private methods: MethodsImpl;
  private server: NativeServer;

  constructor(options?: ServerOptions) {
    super(options);

    this.app = Express();

    this.params = new ParamsImpl();
    this.methods = new MethodsImpl(this.app);
    this.server = this.getServer();
  }

  getServer(): NativeServer {
    if (this.server) {
      return this.server;
    }

    switch (this.options.mode) {
      case 'https':
        return https.createServer(
          { key: this.options.key, cert: this.options.cert },
          this.app,
        );
      default:
        return http.createServer(this.app);
    }
  }

  middleware(route: Route, handler: GenericHandler): void {
    this.methods.add(route, handler);
  }

  protected static getAsyncWrapper(
    handler: GenericHandler,
    params: ParamInfo[],
    paramConverter: ParamsImpl,
  ) {
    const paramLen = params.length;

    return async (
      req: Express.Request,
      res: Express.Response,
      next?: Express.NextFunction,
    ) => {
      let args: unknown[] = [req, res, next];
      const wrappedRes = new ResponseImpl(req, res);

      if (paramLen) {
        args = [];
        const wrappedReq = new RequestImpl(req);

        for (let i = 0; i < paramLen; i++) {
          const param = params[i];
          args[param.index] = paramConverter.convert(
            wrappedReq,
            wrappedRes,
            param.type,
            param.key,
          );
        }
      }

      const reply = (await handler(...args)) as Reply;
      if (typeof reply === 'undefined') {
        return;
      } else if (reply === null) {
        res.end();
        return;
      }

      this.handleResponse(reply, wrappedRes);
    };
  }

  listen(onListening?: GenericHandler): void {
    if (!this.options.address) {
      this.server.listen(this.options.port, onListening);
      return;
    }

    this.server.listen(this.options.port, this.options.address, onListening);
  }

  add(route: Route, p: ParamInfo[], handler: GenericHandler): void {
    this.methods.add(route, Server.getAsyncWrapper(handler, p, this.params));
  }
}
