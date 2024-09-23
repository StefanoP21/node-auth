import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';

export class AuthMidldleware {
  static validateJwt = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authorization = req.header('Authorization');
    if (!authorization) return res.status(401).json({ error: 'Unauthorized' });
    if (!authorization.startsWith('Bearer '))
      return res.status(401).json({ error: 'Invalid Bearer token' });

    const token = authorization.split(' ').at(1) || '';

    try {
      const payload = await JwtAdapter.verifyToken(token);
      if (!payload) return res.status(401).json({ error: 'Unauthorized' });

      req.body.token = payload;

      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}
