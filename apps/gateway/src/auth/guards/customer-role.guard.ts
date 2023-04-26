import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomerRoleGuard implements CanActivate {
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
        return false; // No token found, access denied
      }

      // Verify and decode the JWT token
      const decoded = await this.jwtService.verifyAsync(token);
      console.log('request', decoded);

      const id = decoded.id; // Assuming the user ID is stored in the 'sub' field of the JWT payload
      const user = await this.authService.getUserById(id);

      if (user.role === 'customer') {
        return true; // User is an admin, grant access
      }

      return false; // User is not an admin, access denied
    } catch (error) {
      return false; // JWT token is invalid, access denied
    }
  }
}
