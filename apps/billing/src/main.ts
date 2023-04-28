import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Create a new NestJS microservice instance
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BillingModule,
    {
      //set the kafka to connect the billing for gateway
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'product-consumer',
        },
      },
    },
  );
  
  await app.listen();
}
bootstrap();
