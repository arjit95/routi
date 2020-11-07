import { Request, NextFunction } from '@arjit95/routi-core';
import { IncomingMessage } from 'http';
import { Request as FoxifyRequest } from 'foxify';

export type GenericParamRecord = Record<string, unknown>;
export class RequestImpl extends IncomingMessage implements Request {
  constructor(req: FoxifyRequest) {
    super(req.socket);
    this.params = req.params;
    this.query = req.query;
    this.next = req.next;
    this.root = req;
  }

  readonly root: FoxifyRequest;
  [key: string]: any;
  next?: NextFunction;
}
