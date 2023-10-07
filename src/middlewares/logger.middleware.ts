import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: any, res: any, next: (error?: any) => void) {
    const { method, originalUrl } = req;

    res.on('close', () => {
      const { statusCode } = res;
      this.logger.log(`${method} ${originalUrl} ${statusCode}`);
    });

    next();
  }
}
