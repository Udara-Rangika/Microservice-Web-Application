import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {

    async logData():Promise<any>{
        console.log('order data coming')
        return 'hello from order'
      }
}
