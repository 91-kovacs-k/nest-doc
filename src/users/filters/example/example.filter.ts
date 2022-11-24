import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class ExampleFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const req = host.switchToHttp().getRequest();
    const res = host.switchToHttp().getResponse();

    console.log(`There was an error when reqested: ${req.method}: ${req.url}`);
    res.sendStatus(500);
  }
}
