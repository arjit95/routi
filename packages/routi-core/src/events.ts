import { EventEmitter } from 'events';

export class DecoratorRegistry extends EventEmitter {
  private static _instance: DecoratorRegistry;

  registerHandler(
    eventName: string | symbol,
    handler: (...args: any[]) => void,
    force?: boolean,
  ): boolean {
    if (this.eventNames().includes(eventName) && !force) {
      return false;
    }

    this.on(eventName, handler);
    return true;
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new DecoratorRegistry();
    }

    return this._instance;
  }
}
