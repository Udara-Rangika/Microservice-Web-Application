import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Create a new NestJS microservice instance
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BillingModule,
    {
      // Set up Kafka as the transport layer for communication with other services
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'], // Specify the Kafka broker(s) to connect to
        },
        consumer: {
          groupId: 'product-consumer', // Specify the Kafka consumer group ID
        },
      },
    },
  );
  
  // Start the microservice
  await app.listen();
}
bootstrap();
