import { Readable, Writable, pipeline } from 'stream';
import { Reply } from './reply';
import { Response } from './response';
import { Route } from './route';
import { ParamInfo } from '../decorators/params';
import http from 'http';
import https from 'https';
import { promisify } from 'util';

export type ServerOptions = {
  port: number;
  address?: string;
} & (
  | {
      mode: 'http';
    }
  | {
      cert: string;
      key: string;
      mode: 'https';
    }
);

export type GenericHandler = (...args: unknown[]) => unknown;
export type NativeServer = http.Server | https.Server;

export abstract class BaseServer {
  protected readonly options: ServerOptions;

  constructor(
    options: ServerOptions = { port: 3000, address: 'localhost', mode: 'http' },
  ) {
    this.options = options;
  }

  protected static async writeStream(
    stream1: Readable,
    stream2: Writable,
  ): Promise<void> {
    return promisify(pipeline)(stream1, stream2);
  }

  protected static async handleResponse(reply: Reply, res: Response) {
    if (reply.headers) {
      for (const [key, value] of Object.entries(reply.headers)) {
        res.setHeader(key, value);
      }
    }

    if (reply.status) {
      res.status(reply.status);
    }

    if (reply.message) {
      if (reply.message instanceof Readable) {
        await this.writeStream(reply.message, res);
        return;
      } else if (
        !(reply.message instanceof Buffer) &&
        typeof reply.message === 'object'
      ) {
        res.json(reply.message);
        return;
      } else {
        res.write(reply.message);
      }
    }

    res.end();
  }

  abstract add(
    route: Route,
    params: ParamInfo[],
    handler: GenericHandler,
  ): void;
  abstract middleware(route: Route, handler: GenericHandler): void;
  abstract getServer(): NativeServer;

  abstract listen(onListening?: GenericHandler): void;
}
