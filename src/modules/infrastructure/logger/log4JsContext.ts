import * as Log4js from 'log4js';
import { Log4js as logger } from 'log4js';
import { Injectable, LoggerService as ILogger } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class Log4JSContext implements ILogger {

    public readonly _LOG4JS: logger = Log4js;

    constructor() {
        // tslint:disable-next-line:no-console
        console.log(`Log configuration: ${Log4JSContext.getCnfLogPath()}`);
        this._LOG4JS.configure(Log4JSContext.getCnfLogPath());
    }

    static getCnfLogPath(): string {
        let nodeEnv = (process.env.NODE_ENV === '' || process.env.NODE_ENV === undefined) ? '' : process.env.NODE_ENV.trim();
        nodeEnv = nodeEnv ? `.${nodeEnv}` : 'development';
        return path.normalize(path.join(process.cwd(), `config/log4js${nodeEnv}.json`));
    }

    log(message: string, context?: string) {
        const resLogger = this._LOG4JS.getLogger('system');
        resLogger.level = 'debug';
        resLogger.info(message);
    }
    error(message: string, trace?: string, context?: string) {
        const errorLogger = this._LOG4JS.getLogger('error');
        errorLogger.level = 'debug';
        errorLogger.error(message);
    }
    warn(message: string, context?: string) {
        const warnLogger = this._LOG4JS.getLogger('warn');
        warnLogger.level = 'warn';
        warnLogger.warn(message);
    }
}
