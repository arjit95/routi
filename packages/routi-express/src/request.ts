import { Request, NextFunction, Handler } from '@arjit95/routi-core';
import { IncomingMessage } from 'http';
import Express from 'express';

export type ExpressHandler = Handler<
  Express.Request,
  Express.Response,
  Express.NextFunction
>;

export class RequestImpl extends IncomingMessage implements Request {
  constructor(req: Express.Request) {
    super(req.socket);
    this.next = req.next;
    this.root = req;
  }

  [key: string]: any;
  next?: NextFunction;
  root: Express.Request;
}
