import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from 'src/user/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { hash, compare } from 'bcryptjs';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

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
export class AuthFactory {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsException();
    }
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    return user;
  }

  async login(email: string, password: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    return user; // در صورت موفقیت، کاربر برگردانده می‌شود
  }

  async createUser(registerDto: RegisterDto) {
    const existingUser = await this.userModel.findOne({
      email: registerDto.email,
    });

    if (existingUser) {
      throw new HttpException('Email already registered!', 400);
    }

    const protectedPassword = await this.hashPassword(registerDto.password);

    const { firstName, lastName } = this.separateName(registerDto.fullName);

    const newUser = new this.userModel({
      firstName: firstName,
      lastName: lastName,
      username: registerDto.username,
      email: registerDto.email,
      password: protectedPassword,
      role: UserRole.SUBSCRIBER,
    });

    // return createdUser.save();
    return newUser;
  }

  async refreshToken(token: string): Promise<JWTTokens> {
    try {
      const { sub: email } = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });

      const user = await this.userModel.findOne({ email });
      return this.getTokens(user);
    } catch (err) {
      throw new InvalidCredentialsException();
    }
  }

  async getTokens(payload: UserDocument): Promise<JWTTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: payload.id,
          sub: payload.email,
          role: payload.role,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION',
          ),
        },
      ),
      this.jwtService.signAsync(
        {
          id: payload.id,
          sub: payload.email,
          role: payload.role,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION',
          ),
        },
      ),
    ]);

    return {
      success: true,
      tokens: {
        accessToken,
        refreshToken,
      },
      user: {
        id: payload.id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        username: payload.username,
        email: payload.email,
        role: payload.role,
      },
    };
  }

  private hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  private separateName(fullName: string) {
    const parts = fullName.trim().split(' ');
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ');
    return { firstName, lastName };
  }
}
