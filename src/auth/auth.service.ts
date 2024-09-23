import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { AuthFactory } from './auth.factory';

export interface JWTTokens {
  success: boolean;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };

  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly authFactory: AuthFactory,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.authFactory.validateUser(email, password);
    return this.authFactory.getTokens(user);
  }

  async login(loginDto: loginDto) {
    const { email, password } = loginDto;
    const user = await this.authFactory.login(email, password);
    return this.authFactory.getTokens(user);
  }

  async register(registerDto: RegisterDto) {
    const createdUser = await this.authFactory.createUser(registerDto);
    return createdUser.save();
  }

  async logout(user: any) {
    throw new Error('Method not implemented.');
  }

  async refreshToken(token: string): Promise<JWTTokens> {
    return this.authFactory.refreshToken(token);
  }
}
