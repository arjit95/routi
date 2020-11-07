import { IncomingMessage } from 'http';

export type NextFunction = (...args: unknown[]) => void;

export interface Request extends IncomingMessage {
  next?: NextFunction;
  [key: string]: unknown;
  // Native request object for the framework
  readonly root: unknown;
}
