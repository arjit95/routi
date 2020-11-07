import {
  Controller,
  Module,
  Get,
  ApplicationFactory,
  Reply,
} from '@arjit95/routi-core';

// or @arjit95/routi-foxify
import { Server } from '@arjit95/routi-express';
import { NextFunction, Request, Response } from 'express';

function use(req: Request, res: Response, next: NextFunction): void {
  console.log(`Fetching ${req.url}`);

  if (next) {
    next();
  }
}

@Controller('/', {
  middlewares: {
    middleware: use,
    options: {
      methods: 'use',
    },
  },
})
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
  uses: [Hello],
})
class AppModule {}

ApplicationFactory.create(new Server(), AppModule).listen(() => {
  console.log('Server running at port 3000');
});
