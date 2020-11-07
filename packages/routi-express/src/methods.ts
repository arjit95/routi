import { Methods, Route, Handler } from '@arjit95/routi-core';
import Express from 'express';

export class MethodsImpl extends Methods {
  private app: Express.Application;

  constructor(app: Express.Application) {
    super();
    this.app = app;
  }

  use(
    route: Route,
    handler: Handler<Express.Request, Express.Response, Express.NextFunction>,
  ): void {
    if (route.path) {
      this.app.use(route.path, handler);
    } else {
      this.app.use(handler);
    }
  }

  add(
    route: Route,
    handler: Handler<Express.Request, Express.Response, Express.NextFunction>,
  ): void {
    if (route.type === 'use') {
      this.use(route, handler);
    } else {
      this.app[route.type](route.path, handler);
    }
  }
}
