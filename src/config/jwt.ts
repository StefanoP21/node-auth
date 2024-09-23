import jwt from 'jsonwebtoken';

export class JwtAdapter {
  static async generateToken(
    payload: string | object,
    duration: string = '2h'
  ) {
    return new Promise((resolve) => {
      jwt.sign(payload, 'SEED', { expiresIn: duration }, (err, token) => {
        if (err) {
          console.error(err);
          throw new Error('Error generating token');
        }

        resolve(token);
      });
    });
  }

  static async verifyToken(token: string) {
    return new Promise((resolve) => {
      jwt.verify(token, 'SEED', (err, token) => {
        if (err) {
          console.error(err);
          throw new Error('Error verifying token');
        }

        resolve(token);
      });
    });
  }
}
