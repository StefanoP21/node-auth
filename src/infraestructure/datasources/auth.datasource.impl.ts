import { UserModel } from '../../data/mongodb';
import {
  AuthDatasource,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';

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
