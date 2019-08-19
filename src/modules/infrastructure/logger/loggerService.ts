import { Logger, Injectable, Inject, LoggerService as ILogger } from '@nestjs/common';
import { LoggerRepository } from '../repositories/logger.repository';

@Injectable()
export class LoggerService extends Logger implements ILogger  {

    private _LOGGERREPOSITORY: LoggerRepository;
    constructor(@Inject(LoggerRepository) logger: LoggerRepository) {
        super();
        this._LOGGERREPOSITORY = logger;
    }

    info(message: string, context?: string) {
        this._LOGGERREPOSITORY.log(message, context);
    }
    error(message: string, trace?: string, context?: string) {
        this._LOGGERREPOSITORY.error(message, trace, context);
    }
    warn(message: string, context?: string) {
        this._LOGGERREPOSITORY.warn(message, context);
    }
}
