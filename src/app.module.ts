import { Module } from '@nestjs/common';
import { AirlineController } from './modules/airlines/airlines.controller';
import { AirlineService } from './modules/airlines/airline.service';
import { S3Client } from './modules/infrastructure/aws/s3.client';

@Module({
  imports: [],
  controllers: [AirlineController],
  providers: [AirlineService, S3Client],
})
export class AppModule {}
