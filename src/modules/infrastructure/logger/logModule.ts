import { Module, Global } from '@nestjs/common';
import { LoggerService } from './loggerService';
import { LoggerRepository } from '../repositories/logger.repository';
import { Log4JSContext } from './log4JsContext';

@Global()
@Module({
    imports: [],
    providers: [
      LoggerService,
      LoggerRepository,
    Log4JSContext],
    exports: [
      LoggerService,
      LoggerRepository,
      Log4JSContext,
    ],
  })

  export class LogModule {
  }
