import jwt from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SECRET = envs.JWT_SECRET;

export class JwtAdapter {
  static async generateToken(
    payload: string | object,
    duration: string = '2h'
  ) {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SECRET, { expiresIn: duration }, (err, token) => {
        if (err) {
          console.error(err);
          throw new Error('Error generating token');
        }

        resolve(token);
      });
    });
  }

  static async verifyToken<T>(token: string): Promise<T> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SECRET, (err, token) => {
        if (err) {
          console.error(err);
          throw new Error('Error verifying token');
        }

        resolve(token as T);
      });
    });
  }
}
