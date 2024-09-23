import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // در اینجا مشخص می‌کنیم که به جای username از email استفاده شود
  }

  // این متد مسئول بررسی اعتبار کاربر (احراز هویت) است
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException(); // اگر کاربر پیدا نشود، خطای احراز هویت
    }
    return user;
  }
}
