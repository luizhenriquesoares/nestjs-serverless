import { Injectable } from '@nestjs/common';

@Injectable()
export class AWSService {
    ping(): string {
        return 'Ping AWS!';
    }
}
