import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthFactory } from './auth.factory';
// import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), // استفاده از پاسپورت
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION }, // مدت اعتبار توکن
    }),
    // ConfigModule.forRoot(),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthFactory, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
