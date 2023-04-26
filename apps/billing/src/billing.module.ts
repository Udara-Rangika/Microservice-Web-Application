import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BillingSchema } from './schemas/billing.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://flocktogether2023:Flocktogether2023@cluster0.v52uicz.mongodb.net/?retryWrites=true&w=majority',{dbName: 'billingdb'}),
  MongooseModule.forFeature([{ name: 'Billing', schema: BillingSchema }])],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
