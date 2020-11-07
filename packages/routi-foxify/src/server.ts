import {
  BaseServer,
  ServerOptions,
  Route,
  GenericHandler,
  ParamInfo,
  NextFunction,
  Reply,
  NativeServer,
} from '@arjit95/routi-core';
import { MethodsImpl } from './methods';
import { ParamsImpl } from './params';
import Foxify from 'foxify';
import { RequestImpl } from './request';
import { ResponseImpl } from './response';

export class Server extends BaseServer {
  app: Foxify;
  private params: ParamsImpl;
  private methods: MethodsImpl;

  constructor(options?: ServerOptions) {
    super(options);

    this.app = new Foxify();

    this.params = new ParamsImpl();
    this.methods = new MethodsImpl(this.app);
  }

  getServer(): NativeServer {
    throw new Error('This server does not supports plugins');
  }

  middleware(route: Route, handler: GenericHandler): void {
    this.methods.add(route, handler);
  }

  listen(onListening?: GenericHandler): void {
    this.app.set('port', this.options.port);

    if (this.options.address) {
      this.app.set('url', this.options.address);
    }

    if (this.options.mode === 'https') {
      this.app.enable('https');
      this.app.set('https.key', this.options.key);
      this.app.set('https.cert', this.options.cert);
    }

    this.app.start(onListening);
  }

  protected static getAsyncWrapper(
    handler: GenericHandler,
    params: ParamInfo[],
    paramConverter: ParamsImpl,
  ) {
    const paramLen = params.length;

    return async (
      req: Foxify.Request,
      res: Foxify.Response,
      next?: NextFunction,
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

  add(route: Route, p: ParamInfo[], handler: GenericHandler): void {
    this.methods.add(route, Server.getAsyncWrapper(handler, p, this.params));
  }
}
