import { HttpStatus } from '@nestjs/common';
import { HttpErrorException } from './http.error.exception';

export class RequestTimeoutException extends HttpErrorException {
  constructor() {
    super('درخواست منقضی شد', HttpStatus.REQUEST_TIMEOUT, 'REQUEST_TIMEOUT');
  }
}
