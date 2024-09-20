import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: [String],
    required: [true, 'Role is required'],
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
    default: 'USER_ROLE',
  },
  img: {
    type: String,
  },
});

export const UserModel = model('User', userSchema, 'users');
