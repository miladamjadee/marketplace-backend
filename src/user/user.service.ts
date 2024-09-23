import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  login(user: any) {
    throw new Error('Method not implemented.');
  }
  register(user: any) {
    throw new Error('Method not implemented.');
  }
  logout(user: any) {
    throw new Error('Method not implemented.');
  }
  refreshToken(user: any) {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<UserDocument | undefined> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('کاربر پیدا نشد');
    }
    return user;
  }

  // عملیات حذف کاربر
  async remove(id: string): Promise<any> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: 'User deleted successfully' };
  }

  // عملیات بروزرسانی کاربر
  async update(id: string, updateUserDto: any): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        new: true,
      })
      .exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
