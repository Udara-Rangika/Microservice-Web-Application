import { PartialType } from '@nestjs/mapped-types';
import { CreateBillingDto} from './createBilling.dto';

export class UpdateBillingDto extends PartialType(CreateBillingDto) {}