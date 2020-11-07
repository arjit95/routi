import { Route, HTTPMethod } from '../server';

import { Metadata } from '../constants';

const method = function (path: string, type: HTTPMethod) {
  return function (target: any, propertyKey: string) {
    let routes: Array<Route> = Reflect.getOwnMetadata(
      Metadata.Routes,
      target.constructor,
    );
    if (!routes) {
      routes = [];
    }

    routes.push({ path, type, key: propertyKey });
    Reflect.defineMetadata(Metadata.Routes, routes, target.constructor);
  };
};

export const Post = function (route = '') {
  return method(route, 'post');
};

export const Get = function (route = '') {
  return method(route, 'get');
};

export const Head = function (route = '') {
  return method(route, 'head');
};

export const Put = function (route = '') {
  return method(route, 'put');
};

export const Patch = function (route = '') {
  return method(route, 'patch');
};

export const Delete = function (route = '') {
  return method(route, 'delete');
};
