import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/user/schemas/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true; // اگر نقشی تعریف نشده باشد، همه اجازه دسترسی دارند
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role); // چک کردن اینکه کاربر دارای نقش مورد نظر هست یا خیر
  }
}
