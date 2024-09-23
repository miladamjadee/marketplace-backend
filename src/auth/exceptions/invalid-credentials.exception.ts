import { HttpStatus } from '@nestjs/common';
import { HttpErrorException } from './http.error.exception';

export class InvalidCredentialsException extends HttpErrorException {
  constructor() {
    super('دسترسی غیر مجاز', HttpStatus.UNAUTHORIZED, 'INVALID_CREDENTIALS');
  }
}
