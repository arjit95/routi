import { ServerResponse } from 'http';

export type CookieOptions = {
  maxAge?: number;
  signed?: boolean;
  expires?: Date;
  httpOnly?: boolean;
  path?: string;
  domain?: string;
  secure?: boolean;
  encode?: (val: string) => string;
  sameSite?: boolean | 'lax' | 'strict' | 'none';
};

export interface Response extends ServerResponse {
  json(obj: unknown, status?: number): this;
  redirect(url: string, status?: number): void;
  send(body: unknown): this;
  sendFile(path: string): void;
  status(code: number): this;
  cookie(name: string, value: unknown, options?: CookieOptions): this;
  clearCookie(name: string, options?: CookieOptions): this;
  contentType(type: string): this;
  end(): void;

  // Native response object for the framework
  root: unknown;
}
