import { Server, Socket } from 'socket.io';
import { BaseServer } from '@arjit95/routi-core';
import { Metadata, Events } from './constants';
import http from 'http';
import { CorsOptions } from 'cors';

export type HandlerInfo = {
  event: string;
  propertyKey: string;
};

type Handler = (socket: Socket, ...args: unknown[]) => void;

export type SocketOptions = {
  allowedOrigins?: string[];
  allowRequest?: (
    req: http.IncomingMessage,
    fn: (err: string | null | undefined, success: boolean) => void,
  ) => void;
  cors?: CorsOptions;
  serveClient?: boolean;
};

export class SocketHelper {
  static addSocketServer(wsClass: any, server: BaseServer) {
    const info: {
      options?: SocketOptions;
      handlers: HandlerInfo[];
      path: string | undefined;
    } = Reflect.getOwnMetadata(Metadata.Server, wsClass);
    const io = new Server(server.getServer(), {
      path: info.path,
      ...info.options,
    });

    const wsInstance = new wsClass();
    const handlerMap = new Map<String, Handler>();

    for (const handler of info.handlers) {
      handlerMap.set(
        handler.event,
        wsInstance[handler.propertyKey].bind(wsInstance),
      );
    }

    io.on('connection', function (socket: Socket, ...args: unknown[]) {
      const handler = handlerMap.get(Events.Connect);
      if (handler) {
        handler(socket, ...args);
      }

      for (const [event, handler] of handlerMap.entries()) {
        if (!(event === Events.Connect)) {
          socket.on(event as string, function (...args: unknown[]) {
            handler(socket, ...args);
          });
        }
      }
    });
  }
}
