export type HTTPMethod =
  | 'post'
  | 'get'
  | 'put'
  | 'patch'
  | 'head'
  | 'options'
  | 'delete'
  | 'use';

export type MiddlewareOptions =
  | {
      path: string;
      methods?: HTTPMethod | HTTPMethod[];
    }
  | {
      path?: string;
      methods: 'use';
    };

export interface Middleware {
  options: MiddlewareOptions | MiddlewareOptions[];
  middleware<Req, Res, Next>(req: unknown, res: unknown, next: unknown): void;
}

export type ControllerOptions = {
  middlewares?: Middleware | Middleware[];
};

export type Route = {
  path: string;
  type: HTTPMethod;
  key: string;
  routes?: Array<Route>;
  info?: ControllerOptions;
};

export type Handler<Req, Res, Next> = (
  req: Req,
  res: Res,
  next?: Next,
) => unknown;
