import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    // ClientsModule.register([
    //   { name: 'GATEWAY_SERVICE', transport: Transport.TCP },
    //   {
    //     name: 'PRODUCT_SERVICE',
    //     transport: Transport.TCP,
    //     options: { port: 3001 },
    //   },
    //   {
    //     name: 'ORDER_SERVICE',
    //     transport: Transport.TCP,
    //     options: { port: 3002 },
    //   },
    // ]), 
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'product',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'product-consumer',
          },
        },
      },

      {
        name: 'CLIENT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'cart',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'product-consumer',
          },
        },
      },

      {
        name: 'CLIENT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'order',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'product-consumer',
          },
        },
      },

    ]),
    ConfigModule.forRoot({
      envFilePath: './apps/gateway/.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    ProductModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
