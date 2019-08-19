import { Module } from '@nestjs/common';
import { EnviromentService } from './enviroment.service';
import * as path from 'path';

@Module({
  imports: [],
  providers: [
    {
      provide: EnviromentService,
      useValue: new EnviromentService(EnviromentModule.getEnvPath()),
    },
  ],
  exports: [EnviromentService],
})

export class EnviromentModule {
  static getEnvPath(): string {
    return path.normalize(path.join(process.cwd(),`${
            !process.env.NODE_ENV ? 'development' : process.env.NODE_ENV.trim()
        }.env`,
    ));
  }
}