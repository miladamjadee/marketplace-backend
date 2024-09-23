import { Controller, Post, UseGuards, Req, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.auth.guard';
import { Request } from 'express';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //   @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() loginDto: loginDto) {
    return await this.authService.login(loginDto);
  }
  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }
}
