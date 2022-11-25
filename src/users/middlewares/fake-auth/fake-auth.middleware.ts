import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class FakeAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // if (req.method === 'GET' && req.url === '/users') {
    //   console.log('get all users is not allowed!');
    //   return res.sendStatus(401);
    // }
    next();
  }
}
