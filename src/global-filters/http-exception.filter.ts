import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { HttpErrorException } from 'src/auth/exceptions/http.error.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private configService: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';
    this.logger.error(`⛔️ Exception: ${exception.message}, status: ${status}`);

    const errorResponse = {
      ...(isProduction
        ? {
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: exception.message,
          }
        : {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            stacktrace: exception.stack,
            errorCode:
              exception instanceof HttpErrorException
                ? (exception as HttpErrorException).getErrorCode()
                : 'UNKNOWN_ERROR',
          }),
    };

    response.status(status).json(errorResponse);
  }
}
