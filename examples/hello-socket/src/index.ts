import {
  Controller,
  Module,
  Get,
  ApplicationFactory,
  Reply,
} from '@arjit95/routi-core';

import { Server } from '@arjit95/routi-express';
import { Ws, Subscribe, Events } from '@arjit95/routi-socketio';
import { Socket } from 'socket.io';

@Ws('/ws')
class HelloSocket {
  @Subscribe(Events.Connect)
  onConnect(socket: Socket) {
    console.log(`${socket.id} connected!`);
    socket.emit('hello', { hello: 'world' });
  }

  @Subscribe('hello')
  hello(_: Socket, data: unknown) {
    console.log('hello');
  }

  @Subscribe(Events.Disconnect)
  disconnect(_: Socket, data: unknown) {
    console.log(data);
  }
}

@Controller('/')
class Hello {
  @Get('/world')
  world(): Reply {
    return {
      status: 200,
      message: {
        hello: 'world',
      },
    };
  }
}

@Module({
  uses: [HelloSocket, Hello],
})
class AppModule {}

ApplicationFactory.create(new Server(), AppModule).listen(() => {
  console.log('Server running at port 3000');
});
