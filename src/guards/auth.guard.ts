import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as _ from 'lodash';
import { JwtHelper } from '../utils/jwt.helper';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtToken: JwtHelper) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const token = this.jwtToken.getTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException({
        isError: true,
        message: 'Login required',
      });
    }

    const user = await this.jwtToken.verify(token);

    if (!user) {
      throw new UnauthorizedException({
        isError: true,
        message: 'Login required',
      });
    }

    request.user = user;
    return request;
  }
}
