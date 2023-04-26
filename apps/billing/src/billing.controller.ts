import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/createBilling.dto';
import { UpdateBillingDto } from './dto/updateBilling.dto';

@Controller('billing')
export class BillingController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly billingService: BillingService) {}

  @Post()
  async createBilling(
    @Res() response,
    @Body() createBillingDto: CreateBillingDto,
  ) {
    try {
      const newBilling = await this.billingService.createBilling(
        createBillingDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Payment has been created successfully',
        newBilling,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Payment not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async getPayments(@Res() response) {
    try {
      const billingData = await this.billingService.getAllBilling();
      return response.status(HttpStatus.OK).json({
        message: 'All payment data found successfully',
        billingData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  async updateBilling(
    @Res() response,
    @Param('id') billingId: string,
    @Body() updateBillingDto: UpdateBillingDto,
  ) {
    try {
      const existingBilling = await this.billingService.updateBilling(
        billingId,
        updateBillingDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Payment has been successfully updated',
        existingBilling,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getBilling(@Res() response, @Param('id') billingId: string) {
    try {
      const existingBilling = await this.billingService.getBilling(billingId);
      return response.status(HttpStatus.OK).json({
        message: 'Payment found successfully',
        existingBilling,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteBilling(@Res() response, @Param('id') billingId: string) {
    try {
      const deletedBilling = await this.billingService.deleteBilling(billingId);

      return response.status(HttpStatus.OK).json({
        message: 'Payment Deleted Successfully',
        deletedBilling,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getAllBilling(@Res() response) {
    try {
      const billingData = await this.billingService.getAllBilling();
      return response.status(HttpStatus.OK).json({
        message: 'All Payment data found successfully',
        billingData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  
}
