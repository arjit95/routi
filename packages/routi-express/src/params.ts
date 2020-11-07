import { Params, NextFunction } from '@arjit95/routi-core';
import { RequestImpl } from './request';

export class ParamsImpl extends Params {
  next(req: RequestImpl): NextFunction | undefined {
    return req.next;
  }

  private genericMapPropHandler(record: Record<string, string>, key: string) {
    return record[key];
  }

  params(req: RequestImpl, key: string) {
    return this.genericMapPropHandler(req.params, key);
  }

  query(req: RequestImpl, key: string) {
    return this.genericMapPropHandler(req.query, key);
  }

  body(req: RequestImpl, key: string) {
    return this.genericMapPropHandler(req.body, key);
  }

  form(req: RequestImpl, key: string) {
    return this.genericMapPropHandler(req.form, key);
  }

  cookie(req: RequestImpl, key: string) {
    return this.genericMapPropHandler(req.cookies, key);
  }

  header(req: RequestImpl, key: string) {
    return req.headers[key];
  }
}
