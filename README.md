<p align="center">
  <h3 align="center">Routi</h3>
  <p align="center">    
    A mini rest api framework based on typescript decorators.
    <br />
    <br />
    <a href="examples/">Examples</a>
    ·
    <a href="https://github.com/arjit95/routi/issues">Report Bug</a>
    ·
    <a href="https://github.com/arjit95/routi/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [Getting Started](#getting-started)
  * [Configuration](#configuration)
  * [Usage](#usage)
* [Development](#development)
* [Contributing](#contributing)
* [License](#license)


## Getting started

Add dependency to your project
```bash
# install base 
$ npm install @arjit95/routi-core

# install a server
$ npm install @arjit95/routi-express

# alternatively
$ npm install @arjit95/routi-foxify
```

### Configuration
Update your tsconfig.json to enable decorators emit decorator metadata, this will be used to save additional info related to the decorators used by the app.

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "target": "es6"
  }
}
```
### Usage
```typescript
import {
  Controller,
  Module,
  Get,
  Res,
  ApplicationFactory
} from '@arjit95/routi-core';

// or @arjit95/routi-foxify
import { Server, Response } from '@arjit95/routi-express';

@Controller('hello')
class HelloController {
  @Get('/world')
  world(@Res res: Response) {
    res.json({hello: 'world'});
  }
}

@Module({
  uses: [HelloController]
})
class AppModule {}

ApplicationFactory
  .create(new Server(), AppModule)
  .listen(() => {
    console.log('Server running at port 3000');
  });
```

Compile and run the app, then point your browser to `localhost:3000/hello/world` to see the result. 

There are other examples available in the example [directory](examples/)

Routi can be extended using plugins. A minimal plugin to handle socket io connections can be found [here](packages/routi-socketio)

Note: Currently foxify does not supports plugin as it does not expose its underlying http instance.

## Development
Before starting, make sure to use > npm@7 as it has better peer dependency support and supports workspaces.

```bash
# start by cloning the repo
$ git clone https://github.com/arjit95/routi
$ cd routi

# install all the required dependencies
$ npm i

# build the updated source
$ npm run build
```

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under MIT License.