import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP'); //context console이 많아지면 뒤죽박죽 되는것을 방지
  //HTTP관련 요청들은 특별하게 보임

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      this.logger.log(
        //console.log or Looger.log()
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });
    //Router보다 먼저 실행되기 때문에 response.on 비동기로.
    //라우터 시작하고 기록하고 next가고 finish되고나서 response.on이 실행
    //nest morgan도 있음
    next();
  }
}
