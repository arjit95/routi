import { SocketHelper, HandlerInfo, SocketOptions } from './plugin';
import { Metadata } from './constants';
import { DecoratorRegistry } from '@arjit95/routi-core';

export const Ws = function (
  path?: string | SocketOptions,
  options?: SocketOptions,
): ClassDecorator {
  return (target: any) => {
    DecoratorRegistry.getInstance().registerHandler(
      Metadata.Server,
      SocketHelper.addSocketServer,
    );

    if (typeof path === 'object') {
      options = path;
      path = undefined;
    }

    const handlers: HandlerInfo[] = Reflect.getOwnMetadata(
      Metadata.Handler,
      target,
    );
    Reflect.defineMetadata(
      Metadata.Server,
      { options, handlers, path },
      target,
    );
  };
};

export const Subscribe = function (event: string) {
  return function (target: any, propertyKey: string) {
    let handlers: Array<HandlerInfo> = Reflect.getOwnMetadata(
      Metadata.Handler,
      target.constructor,
    );
    if (!handlers) {
      handlers = [];
    }

    handlers.push({ event, propertyKey });
    Reflect.defineMetadata(Metadata.Handler, handlers, target.constructor);
  };
};
