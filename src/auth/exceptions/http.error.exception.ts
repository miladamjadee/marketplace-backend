import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpErrorException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus,
    private readonly errorCode: string,
  ) {
    super({ message, errorCode }, status);
  }

  getErrorCode(): string {
    return this.errorCode;
  }
}
