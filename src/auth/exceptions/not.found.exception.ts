import { HttpStatus } from '@nestjs/common';
import { HttpErrorException } from './http.error.exception';

export class ResourceNotFoundException extends HttpErrorException {
  constructor(resource: string) {
    super(
      `${resource} موردی یافت نشد`,
      HttpStatus.NOT_FOUND,
      'RESOURCE_NOT_FOUND',
    );
  }
}
