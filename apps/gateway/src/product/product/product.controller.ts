import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/role/roles.guard';
import { Roles } from '../roles.decorator';
import { AdminRoleGuard } from '../../auth/guards/admin-role.guard';
import { UserRoleGuard } from '../../auth/guards/user-role.guard';

@Controller('product')
export class ProductController {
  @Get()
  @UseGuards(RolesGuard) // Chain the guards here
  @Roles( 'user') // Add the roles here
  async getProducts() {
    return 'This is a list of products';
  }
}
