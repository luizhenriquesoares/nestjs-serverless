import { Controller, Get } from '@nestjs/common';
import { AWSService } from './aws.service';

@Controller()
export class AWSController {
  constructor(private readonly awsSvc: AWSService) {}

  @Get('aws')
  check(): string {
    return this.awsSvc.ping();
  }
}
