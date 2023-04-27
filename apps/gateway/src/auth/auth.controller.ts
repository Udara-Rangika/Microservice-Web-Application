import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { UserRoleGuard } from './guards/user-role.guard';
import { CustomerRoleGuard } from './guards/customer-role.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from '../product/guards/role/roles.guard';
import { Roles } from '../product/roles.decorator';

//set the controller for auth
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //create the user register
  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  //create the user login
  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  //get the all users
  @Get('/all')
  @UseGuards(UserRoleGuard)
  getAll(): Promise<User[]> {
    return this.authService.getAllUsers();
  }

  //create the user by admin
  @Post('/create-user')
  @UseGuards(RolesGuard)
  @Roles('admin')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.createUser(createUserDto);
  }
}
