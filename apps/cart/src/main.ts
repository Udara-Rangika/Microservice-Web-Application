import { NestFactory } from '@nestjs/core';
import { CartModule } from './cart.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  //create the microservice for cart
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CartModule,
    {
      //set the kafka to connect the cart for gateway
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
