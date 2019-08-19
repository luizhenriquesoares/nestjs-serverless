import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class EnviromentService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  get(key: string): any {
    return this.envConfig[key];
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      APP_PORT: Joi.number().required(),
      APP_HTTPS: Joi.string().required(),
      SECURITY_TOKEN_EXPIRE_IN: Joi.number().required(),
      SECURITY_SECRET_KEY: Joi.string().required(),
    });

    const { error, value: validateEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validateEnvConfig;
  }
}