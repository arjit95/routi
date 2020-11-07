import { Route } from './route';

export abstract class Methods {
  abstract add(route: Route, handler: unknown): void;
  abstract use(route: Route, handler: unknown): void;
}
