import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../user/schemas/user.schema';

export const ROLE_KEY = 'role';
// ایجاد decorator برای نقش‌ها
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
