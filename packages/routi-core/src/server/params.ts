import { Request, NextFunction } from './request';
import { Response } from './response';
import { Params as ParamsConst } from '../constants';

export abstract class Params {
  convert(req: Request, res: Response, type: symbol, key: string): unknown {
    switch (type) {
      case ParamsConst.Body:
        return this.body(req, key);
      case ParamsConst.Cookie:
        return this.cookie(req, key);
      case ParamsConst.Form:
        return this.form(req, key);
      case ParamsConst.Header:
        return this.header(req, key);
      case ParamsConst.Next:
        return this.next(req);
      case ParamsConst.Query:
        return this.query(req, key);
      case ParamsConst.Request:
        return req;
      case ParamsConst.Response:
        return res;
      case ParamsConst.URLParam:
        return this.params(req, key);
    }

    return null;
  }

  abstract body(req: Request, key: string): string | undefined;
  abstract params(req: Request, key: string): string | undefined;
  abstract query(req: Request, key: string): string | undefined;
  abstract form(req: Request, key: string): unknown;
  abstract cookie(req: Request, key: string): string | undefined;
  abstract header(req: Request, key: string): string | string[] | undefined;
  abstract next(req: Request): NextFunction | undefined;
}
