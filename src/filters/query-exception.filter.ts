import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
  constructor(private configService: ConfigService) {}

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const isProd = this.configService.get<string>('ENV') === 'PROD';

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = isProd ? 'Internal Server Error' : exception.message;

    response.status(500).json({ statusCode: 500, message, data: null });
  }
}
