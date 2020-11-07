import { Response, CookieOptions } from '@arjit95/routi-core';
import { ServerResponse } from 'http';
import { Response as FoxifyResponse, Request } from 'foxify';
import { GenericParamRecord } from './request';

export class ResponseImpl extends ServerResponse implements Response {
  readonly root: FoxifyResponse;
  constructor(req: Request, res: FoxifyResponse) {
    super(req);
    this.root = res;
  }

  json(obj: GenericParamRecord | unknown[], status?: number): this {
    this.root.json(obj, status);
    return this;
  }

  redirect(url: string, status?: number): void {
    this.root.redirect(url, status);
  }

  send(body: string | GenericParamRecord | unknown[] | Buffer): this {
    this.root.send(body);
    return this;
  }

  sendFile(path: string): void {
    this.root.sendFile(path);
  }

  status(code: number): this {
    this.root.status(code);
    return this;
  }

  cookie(
    name: string,
    value: string | GenericParamRecord,
    options?: CookieOptions,
  ): this {
    if (options) {
      this.root.cookie(name, value, options);
    } else {
      this.root.cookie(name, value);
    }

    return this;
  }

  clearCookie(name: string, options?: CookieOptions): this {
    if (!options) {
      this.root.clearCookie(name);
    } else {
      this.root.clearCookie(name, options);
    }

    return this;
  }

  contentType(type: string): this {
    this.root.contentType(type);
    return this;
  }
}
