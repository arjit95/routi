import { Metadata } from '../constants';

export type ModuleOptions = {
  uses: any[];
};

export const Module = function (options?: ModuleOptions) {
  return (target: any) => {
    Reflect.defineMetadata(Metadata.Module, options, target);
  };
};
