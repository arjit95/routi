import { Metadata } from './constants';
import { BaseServer } from './server';
import { ModuleOptions } from './decorators/module';
import { DecoratorRegistry } from './events';

export class ApplicationFactory {
  static create(server: BaseServer, module: any) {
    const options: ModuleOptions = Reflect.getMetadata(Metadata.Module, module);
    const registry = DecoratorRegistry.getInstance();
    for (const use of options.uses) {
      if (Reflect.hasOwnMetadata(Metadata.Module, use)) {
        ApplicationFactory.create(server, use);
        continue;
      }

      const keys = Reflect.getOwnMetadataKeys(use);
      for (const key of keys) {
        registry.emit(key, use, server);
      }
    }

    return server;
  }
}
