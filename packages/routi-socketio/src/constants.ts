export const Metadata = {
  Handler: Symbol('socketio:handler'),
  Server: Symbol('socketio:server'),
};

export const Data = Symbol('data');
export const Params = Symbol('params');

export const Events = {
  Connect: 'connection',
  Disconnect: 'disconnect',
};
