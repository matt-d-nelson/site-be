import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { ROLES_KEY } from 'src/auth/decorators/roles/roles.decorator'
import { ROLE } from 'src/auth/models/auth.interface'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    const { user, params } = context.switchToHttp().getRequest()
    const reqOrgRole = user.roles.find((role) => {
      return role.orgId.id === parseInt(params.orgId)
    })

    return requiredRoles.includes(reqOrgRole?.role)
  }
}
