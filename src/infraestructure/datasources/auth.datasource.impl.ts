import { UserModel } from '../../data/mongodb';
import {
  AuthDatasource,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';
import { UserMapper } from '../mappers/user.mapper';

type Hash = (password: string) => string;
type Compare = (password: string, hash: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(private readonly hash: Hash, private readonly compare: Compare) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      const userExists = await UserModel.findOne({ email });
      if (userExists) throw CustomError.conflict('User already exists');

      const hashedPassword = this.hash(password);

      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();

      return UserMapper.userEntityFromObject(user);
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
