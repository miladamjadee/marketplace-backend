import { HttpStatus } from '@nestjs/common';
import { HttpErrorException } from './http.error.exception';

export class UnsupportedMediaTypeException extends HttpErrorException {
  constructor() {
    super(
      'نوع محتوای غیرمجاز',
      HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      'UNSUPPORTED_MEDIA_TYPE',
    );
  }
}
