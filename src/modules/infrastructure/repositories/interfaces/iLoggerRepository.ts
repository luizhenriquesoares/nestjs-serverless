export interface ILoggerRepository {
    log(message: string, context: string);
    error(message: string, trace: string, context: string);
    warn(message: string, context: string);
}
