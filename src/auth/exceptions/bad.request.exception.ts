import { HttpStatus } from '@nestjs/common';
import { HttpErrorException } from './http.error.exception';

export class BadRequestException extends HttpErrorException {
  constructor() {
    super('درخواست نادرست', HttpStatus.BAD_REQUEST, 'BAD_REQUEST');
  }
}
