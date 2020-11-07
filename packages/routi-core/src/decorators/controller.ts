import { Metadata } from '../constants';
import { ControllerOptions, Route } from '../server';
import { DecoratorRegistry } from '../events';
import { BaseServer } from '../server';
import { mergePaths } from '../helper';
import { ParamInfo } from './params';

class ControllerHelper {
  routes: Route[];
  path: string;
  info: ControllerOptions;

  constructor(routes: Route[], path: string, info: ControllerOptions) {
    this.routes = routes;
    this.path = path;
    this.info = info;
  }

  private static addMiddlewares(
    parent: string,
    server: BaseServer,
    info: ControllerOptions,
  ) {
    let middlewares = info.middlewares;
    if (!middlewares) {
      return;
    }

    if (!Array.isArray(middlewares)) {
      middlewares = [middlewares];
    }

    for (const middlewareInfo of middlewares) {
      let options = middlewareInfo.options;
      if (!Array.isArray(options)) {
        options = [options];
      }

      for (const option of options) {
        const path = option.path || '';
        let methods = option.methods || ['use'];
        if (!Array.isArray(methods)) {
          methods = [methods];
        }

        for (const method of methods) {
          server.middleware(
            {
              path: mergePaths(parent, path),
              type: method,
              key: 'middleware',
            },
            middlewareInfo.middleware,
          );
        }
      }
    }
  }

  static addController(controller: any, server: BaseServer) {
    const helper: ControllerHelper = Reflect.getOwnMetadata(
      Metadata.Controller,
      controller,
    );
    const instance = new controller();

    if (helper.info) {
      ControllerHelper.addMiddlewares(helper.path, server, helper.info);
    }

    for (const route of helper.routes || []) {
      let parameters: ParamInfo[] = Reflect.getOwnMetadata(
        Metadata.Params,
        controller,
        route.key,
      );

      parameters = parameters || [];

      route.path = mergePaths(helper.path, route.path);

      const handler = instance[route.key];
      server.add(route, parameters, handler.bind(instance));
    }
  }
}

export const Controller = function (path = '', info: ControllerOptions = {}) {
  return (target: any) => {
    DecoratorRegistry.getInstance().registerHandler(
      Metadata.Controller,
      ControllerHelper.addController,
    );

    const routes = Reflect.getOwnMetadata(Metadata.Routes, target) || [];
    Reflect.defineMetadata(
      Metadata.Controller,
      new ControllerHelper(routes, path, info),
      target,
    );
  };
};
