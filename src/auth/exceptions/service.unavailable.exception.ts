import { HttpStatus } from '@nestjs/common';
import { HttpErrorException } from './http.error.exception';

export class ServiceUnavailableException extends HttpErrorException {
  constructor() {
    super(
      'Service Unavailable',
      HttpStatus.SERVICE_UNAVAILABLE,
      'SERVICE_UNAVAILABLE',
    );
  }
}
