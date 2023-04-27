import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  //create the user register service
  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      role: 'user',
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  //create the login user service
  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id, role: user.role });

    return { token };
  }

  //user get by id
  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id }).lean().exec();

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user as User;
  }

  //get all users
  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find();

    if (!users) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return users;
  }

  //get user by email
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return null;
    }

    return user;
  }

  //create admin user
  async createAdminUser(
    email: string,
    password: string,
    role: string,
  ): Promise<void> {
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new UnauthorizedException('Admin user already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = new this.userModel({
      name: 'Admin',
      email,
      password: hashedPassword,
      role,
    });

    await adminUser.save();
  }

  //create user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, role } = createUserDto;
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new UnauthorizedException('Admin user already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    return user;
  }
}
