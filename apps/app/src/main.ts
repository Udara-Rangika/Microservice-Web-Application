import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';


async function bootstrap() {
  //create the microservice for product
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      //set the kafka to connect the product for gateway
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
  app.listen();
}
bootstrap();
