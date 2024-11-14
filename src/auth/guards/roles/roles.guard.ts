import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/auth/decorators/roles/roles.decorator';
import { ROLE } from 'src/auth/models/auth.interface';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}



  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if(!requiredRoles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()

    //TODO: I need to attach user roles to the user when it is returned so we can check if the user has admin for the org they are reqing to

    return true
  }
}
