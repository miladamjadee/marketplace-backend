import { HttpStatus } from '@nestjs/common';
import { HttpErrorException } from './http.error.exception';

export class NotImplementedException extends HttpErrorException {
  constructor() {
    super(
      'این قابلیت هنوز پیاده‌سازی نشده است',
      HttpStatus.NOT_IMPLEMENTED,
      'NOT_IMPLEMENTED',
    );
  }
}
