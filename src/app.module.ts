import { Module } from '@nestjs/common';
import { AWSController } from './modules/aws/aws.controller';
import { AWSService } from './modules/aws/aws.service';

@Module({
  imports: [],
  controllers: [AWSController],
  providers: [AWSService],
})
export class AppModule {}
