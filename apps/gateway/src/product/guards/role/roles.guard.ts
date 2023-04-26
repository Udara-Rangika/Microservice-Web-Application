import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();

    try {
      // Extract the JWT token from the request headers or query parameters
      const token =
        request.headers.authorization?.replace('Bearer ', '') ||
        request.query.token;

      if (!token) {
        throw new ForbiddenException('No token found'); // Throw a ForbiddenException with custom error message
      }

      // Verify and decode the JWT token
      const decoded = await this.jwtService.verifyAsync(token);
      console.log('decoded', decoded);

      const role = decoded.role; // Assuming the user ID is stored in the 'id' field of the JWT payload
      console.log('decoded', role);

      return roles.includes(role);
    } catch (error) {
      throw new ForbiddenException('JWT token is invalid'); // Throw a ForbiddenException with custom error message
    }
  }
}
