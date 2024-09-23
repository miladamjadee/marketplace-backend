import { HttpStatus } from '@nestjs/common';
import { HttpErrorException } from './http.error.exception';

export class PayloadTooLargeException extends HttpErrorException {
  constructor() {
    super(
      'داده ارسال شده بیش از حد بزرگ است',
      HttpStatus.PAYLOAD_TOO_LARGE,
      'PAYLOAD_TOO_LARGE',
    );
  }
}
