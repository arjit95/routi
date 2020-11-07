import { Params, Metadata } from '../constants';
import { GenericHandler } from '../server';

export type ParamInfo = {
  key: string;
  type: symbol;
  index: number;
};

const Param = function (type: symbol, key: string) {
  return function (target: GenericHandler, method: string, index: number) {
    const existingRequiredParameters: ParamInfo[] =
      Reflect.getOwnMetadata(Metadata.Params, target.constructor, method) || [];
    existingRequiredParameters.push({
      key,
      type,
      index,
    });

    Reflect.defineMetadata(
      Metadata.Params,
      existingRequiredParameters,
      target.constructor,
      method,
    );
  };
};

export const BodyParam = function (key: string) {
  return Param(Params.Body, key);
};

export const QueryParam = function (key: string) {
  return Param(Params.Query, key);
};

export const FormParam = function (key: string) {
  return Param(Params.Form, key);
};

export const CookieParam = function (key: string) {
  return Param(Params.Cookie, key);
};

export const HeaderParam = function (key: string) {
  return Param(Params.Header, key);
};

export const URLParam = function (key: string) {
  return Param(Params.URLParam, key);
};

export const Req = Param(Params.Request, '');
export const Res = Param(Params.Response, '');
export const NextParam = Param(Params.Next, '');
