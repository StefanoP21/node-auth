import { CustomError, UserEntity } from '../../domain';

export class UserMapper {
  static userEntityFromObject(object: Record<string, any>): UserEntity {
    const { id, _id, name, email, password, role, img } = object;

    if (!_id || !id) throw CustomError.badRequest('Invalid id');
    if (!name) throw CustomError.badRequest('Invalid name');
    if (!email) throw CustomError.badRequest('Invalid email');
    if (!password) throw CustomError.badRequest('Invalid password');
    if (!role) throw CustomError.badRequest('Invalid role');

    return new UserEntity(_id || id, name, email, password, role, img);
  }
}
