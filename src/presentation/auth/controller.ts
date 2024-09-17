import { Request, Response } from 'express';

export class AuthController {
  constructor() {}

  registerUser = (req: Request, res: Response) => {
    res.json('register constroller');
  };

  loginUser = (req: Request, res: Response) => {
    res.json('login constroller');
  };
}
