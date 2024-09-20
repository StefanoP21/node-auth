import { BcryptAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';
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
      const userExists = await UserModel.findOne({ email });
      if (userExists) throw CustomError.conflict('User already exists');

      const hashedPassword = BcryptAdapter.hash(password);

      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });

      return new UserEntity(user.id, name, email, user.password, user.role);
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
