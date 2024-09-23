import { HttpStatus } from '@nestjs/common';
import { HttpErrorException } from './http.error.exception';

export class InternalServerErrorException extends HttpErrorException {
  constructor() {
    super(
      'خطای داخلی سرور',
      HttpStatus.INTERNAL_SERVER_ERROR,
      'INTERNAL_SERVER_ERROR',
    );
  }
}
