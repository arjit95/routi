import { Methods, Route, Handler, NextFunction } from '@arjit95/routi-core';
import Foxify from 'foxify';

export class MethodsImpl extends Methods {
  private router: Foxify;

  constructor(router: Foxify) {
    super();
    this.router = router;
  }

  use(
    route: Route,
    handler: Handler<Foxify.Request, Foxify.Response, NextFunction>,
  ): void {
    if (route.path) {
      this.router.use(route.path, handler);
    } else {
      this.router.use(handler);
    }
  }

  add(
    route: Route,
    handler: Handler<Foxify.Request, Foxify.Response, NextFunction>,
  ): void {
    if (route.type === 'use') {
      this.use(route, handler);
    } else {
      this.router[route.type](route.path, handler);
    }
  }
}
