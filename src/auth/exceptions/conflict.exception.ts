import { HttpStatus } from '@nestjs/common';
import { HttpErrorException } from './http.error.exception';

export class ConflictException extends HttpErrorException {
  constructor(message: string) {
    super(
      `${message} این مورد قبلاً وجود دارد`,
      HttpStatus.CONFLICT,
      'RESOURCE_CONFLICT',
    );
  }
}
