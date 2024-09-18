import {
  AuthDatasource,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';

export class AuthDatasourceImpl implements AuthDatasource {
  async registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      return new UserEntity('1', name, email, password, ['ADMIN']);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      throw CustomError.internal('Internal error');
    }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
}
