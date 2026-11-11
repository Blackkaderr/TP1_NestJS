import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { RequestWithUserId } from '../types/request-with-user-id';

export const AUTH_HEADER = 'auth-user';
export const UNAUTHORIZED_MESSAGE =
  "Vous ne pouvez pas accéder à cette ressource : le header 'auth-user' doit contenir un token JWT valide avec un userId.";

@Injectable()
export class AuthSimulationMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: RequestWithUserId, res: Response, next: NextFunction): void {
    const userId = this.extractUserId(req.get(AUTH_HEADER));
    if (userId === null) {
      res.status(401).json({ statusCode: 401, message: UNAUTHORIZED_MESSAGE });
      return;
    }
    req.userId = userId;
    next();
  }

  private extractUserId(token?: string): number | null {
    if (!token) return null;
    try {
      const payload = verify(token, this.configService.getOrThrow<string>('SECRET'));
      if (typeof payload === 'string' || typeof payload.userId !== 'number') return null;
      return payload.userId;
    } catch {
      return null;
    }
  }
}
