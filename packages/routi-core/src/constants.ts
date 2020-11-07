export const Metadata = {
  Controller: Symbol('controller'),
  Module: Symbol('module'),
  Routes: Symbol('routes'),
  Params: Symbol('params'),
};

export const Params = {
  Body: Symbol('bodyparam'),
  Query: Symbol('queryparam'),
  Form: Symbol('formparam'),
  Cookie: Symbol('cookieparam'),
  Header: Symbol('headerparam'),
  Request: Symbol('requestparam'),
  Response: Symbol('responseparam'),
  Next: Symbol('nextparam'),
  URLParam: Symbol('urlparam'),
};
