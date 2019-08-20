import { Injectable } from '@nestjs/common';
import * as AWS  from 'aws-sdk';
import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import {DataMapper} from '@aws/dynamodb-data-mapper';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import "reflect-metadata";

@Injectable()
export class S3Client<T> {

    private readonly connection: AWS.S3;
    private readonly dynamoDB: DynamoDB;
    private readonly mapper: DataMapper

    constructor () {
        this.connection = new AWS.S3({region: 'sa-east-1'});
        const client = new DynamoDB({region:'sa-east-1'});
        this.mapper = new DataMapper({client});
    }

    /**
     * 
     * upload file to bucket s3
     * 
     * @param filePath 
     * @param payload 
     */
    // public upload (filePath: string, payload: string): Promise<ManagedUpload.SendData> {

    //     return new Promise<ManagedUpload.SendData>((resolve: Function, reject: Function): void => {
    //         this.connection.upload(
    //             {
    //                 Bucket: this.bucketName,
    //                 Key: `${this.filePathPrefix}/${filePath}`,
    //                 Body: payload,
    //             },
    //             (err: Error, data: ManagedUpload.SendData) => {
    //                 err ? reject(err) : resolve(data);
    //             },
    //         );
    //     });
    // }

    /**
     * Store in DynamoDB AWS
     * 
     * @param entity 
     */
    public updateDynamoDB (entity: T): Promise<T> {
        return new Promise((resolve: Function, reject: Function): void => {
            this.mapper.put({item: entity}).then((result) => {
                console.log('ola', result);
                if (!result) {
                    resolve(result);
                }
                reject('Error ao Persistir no DynamoDB');
            });
        });
    }

    public createTableDynamoDB(entity: any): Promise<T>  {
        return new Promise((resolve: Function, reject: Function): void => {
            this.mapper.createTable(entity, {readCapacityUnits: 5, writeCapacityUnits: 5})
            .then(() => {
                resolve('Criado com sucesso');
            }, (err) => {
                reject('Error criar tabela no DynamoDB');
                console.log(err);
            });
        })
    }

    /**
     * upload in batch to s3 bucket
     * 
     * @param filePath 
     * @param payloadItems 
     */
    // public uploadInBatch (filePath: string, payloadItems: object[]): Promise<ManagedUpload.SendData> {
    //     if (!Array.isArray(payloadItems) || payloadItems.length < 1) {
    //         throw new Error('You are trying to upload an empty file.');
    //     }
    //     const payload: string = payloadItems
    //         .reduce((prev: string, value: object): string => `${prev}${JSON.stringify(value)}\n`, '')
    //         .trim();

    //     return new Promise<ManagedUpload.SendData>((resolve: Function, reject: Function): void => {
    //         this.connection.upload(
    //             {
    //                 Bucket: this.bucketName,
    //                 Key: `${this.filePathPrefix}/${filePath}`,
    //                 Body: payload,
    //             },
    //             (err: Error, data: ManagedUpload.SendData) => {
    //                 err ? reject(err) : resolve(data);
    //             },
    //         );
    //     });
    // }
  
}
