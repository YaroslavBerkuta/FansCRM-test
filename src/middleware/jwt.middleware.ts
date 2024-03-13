import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'].replace(/^Bearer\s/, '');

    if (token) {
      jwt.verify(token, 'ASD12JD12M0,9-D1S21', (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        } else {
          req['user'] = decoded;
          next();
        }
      });
    } else {
      return res.status(401).json({ message: 'Token not provided' });
    }
  }
}
