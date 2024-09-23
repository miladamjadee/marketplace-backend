import { HttpStatus } from '@nestjs/common';
import { HttpErrorException } from './http.error.exception';

export class ForbiddenException extends HttpErrorException {
  constructor() {
    super('دسترسی غیرمجاز به این منبع', HttpStatus.FORBIDDEN, 'FORBIDDEN');
  }
}
