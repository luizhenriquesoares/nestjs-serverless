import { Module } from '@nestjs/common';
import { AWSService } from './modules/infrastructure/aws/aws.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AWSService],
})
export class AppModule {}
