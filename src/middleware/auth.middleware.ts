import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const { Authentication, Refresh } = req.cookies;
    const user = {
      id: 1,
      name: 'sreejith',
      email: 'sreejith@gmail.com',
      avatarUrl: null,
      hashRt: null,
      createdAt: 123,
      updatedAt: 121212,
    };

    if (!user) {
      throw new UnauthorizedException({ message: 'please authenticate' });
    }
    req.user = { ...user };

    next();
  }
}
