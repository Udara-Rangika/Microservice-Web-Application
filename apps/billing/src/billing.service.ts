import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBilling } from './interface/billing.interface';
import { CreateBillingDto } from './dto/createBilling.dto';
import { UpdateBillingDto } from './dto/updateBilling.dto';

@Injectable()
export class BillingService {
  constructor(@InjectModel('Billing') private billingModel: Model<IBilling>) {}
  
  //create the new product
  async createBilling(createBillingDto: CreateBillingDto): Promise<IBilling> {
    const newBilling = await new this.billingModel(createBillingDto);
    return newBilling.save();
  }

  //read the product by using id
  async getBilling(billingId: string): Promise<IBilling> {
    const existingBilling = await this.billingModel.findById(billingId).exec();
    if (!existingBilling) {
      throw new NotFoundException(`Billing #${billingId} not found`);
    }
    return existingBilling;
  }

  //Delete the product
  async deleteBilling(billingId: string): Promise<IBilling> {
    const deletedBilling = await this.billingModel.findByIdAndDelete(billingId);
    if (!deletedBilling) {
      throw new NotFoundException(`Billing #${billingId} not found`);
    }
    return deletedBilling;
  }

  //Update the prodcut
  async updateBilling(
    billingId: string,
    updateBillingDto: UpdateBillingDto,
  ): Promise<IBilling> {
    const existingBilling = await this.billingModel.findByIdAndUpdate(
      billingId,
      updateBillingDto,
      { new: true },
    );
    if (!existingBilling) {
      throw new NotFoundException(`Billing #${billingId} not found`);
    }
    return existingBilling;
  }

  //Get all product details
  async getAllBilling(): Promise<IBilling[]> {
    const billingData = await this.billingModel.find();
    if (!billingData || billingData.length == 0) {
      throw new NotFoundException('Billing data not found!');
    }
    return billingData;
  }

}
