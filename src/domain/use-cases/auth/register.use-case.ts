import { JwtAdapter } from '../../../config';
import { RegisterUserDto } from '../../dtos/auth/register-user.dto';
import { CustomError } from '../../errors/custom.error';
import { AuthRepository } from '../../repositories/auth.repository';

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

type SignToken = (
  payload: string | object,
  duration?: string
) => Promise<unknown>;

interface RegisterUseCase {
  execute(RegisterUserDto: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUser implements RegisterUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    const user = await this.authRepository.registerUser(registerUserDto);

    const token = await this.signToken({ email: user.email }, '2h');
    if (!token) throw CustomError.internal('Error generating token');

    return {
      token: token as string,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
