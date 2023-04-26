import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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

      const id = decoded.id; // Assuming the user ID is stored in the 'id' field of the JWT payload
      const user = await this.authService.getUserById(id);
      console.log('decoded', user);

      if (user && user.role === 'admin') {
        // Check if user exists and has admin role
        return true; // User is an admin, grant access
      }

      throw new ForbiddenException('Forbidden resource'); // Throw a ForbiddenException with custom error message
    } catch (error) {
      throw new ForbiddenException('JWT token is invalid'); // Throw a ForbiddenException with custom error message
    }
  }
}
