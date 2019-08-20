import { Injectable } from "@nestjs/common";
import { AirlineDto } from "./airline.dto";
import { S3Client } from "../infrastructure/aws/s3.client";
import { AirlineEntity } from "./airline.entity";

@Injectable()
export class AirlineService {

    public s3ClientSvc: S3Client<AirlineEntity>;

    constructor(s3ClientSvc: S3Client<AirlineEntity>) {
        this.s3ClientSvc = new S3Client();
    }

    async create(airlineDto: AirlineDto): Promise<AirlineDto> {

        try {
            const toSave = this.ToEntity(airlineDto);
            return await this.s3ClientSvc.updateDynamoDB(toSave)
        } catch (error) {
            console.log('error', error);
        }
    }


    public ToEntity(airlineDto: AirlineDto): AirlineEntity {
        return Object.assign(new AirlineEntity, airlineDto);
    }

}