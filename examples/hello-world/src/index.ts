import {
  Controller,
  Module,
  Get,
  Res,
  ApplicationFactory,
} from '@arjit95/routi-core';

// or @@arjit95/routi-foxify
import { Server, Response } from '@arjit95/routi-express';

@Controller('/')
class Hello {
  @Get('/world')
  world(@Res res: Response) {
    res.json({ hello: 'world' });
  }
}

@Module({
  uses: [Hello],
})
class AppModule {}

ApplicationFactory.create(new Server(), AppModule).listen(() => {
  console.log('Server running at port 3000');
});
