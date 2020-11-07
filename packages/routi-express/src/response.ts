import { Response, CookieOptions } from '@arjit95/routi-core';
import { ServerResponse } from 'http';
import { Response as ExpressResponse, Request } from 'express';

export class ResponseImpl extends ServerResponse implements Response {
  readonly root: ExpressResponse;
  constructor(req: Request, res: ExpressResponse) {
    super(req);
    this.root = res;
  }

  json(obj: unknown, status?: number): this {
    if (status) {
      this.status(status);
    }

    this.root.json(obj);
    return this;
  }

  redirect(url: string, status?: number): void {
    if (status) {
      this.status(status);
    }

    this.root.redirect(url);
  }

  send(body: unknown): this {
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

  cookie(name: string, value: unknown, options?: CookieOptions): this {
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
