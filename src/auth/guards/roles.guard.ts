import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/rol.decorator';
import { ROLE } from '../../common/enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {

    // A traves de reflector se pueden leer los metadatos
    // Lo que devuelve tiene que ser de tipo ROLE
    const role = this.reflector.getAllAndOverride<ROLE>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    

    if (!role) {
      return true
    }

    const {user} = context.switchToHttp().getRequest()

    if(user.role === ROLE.ADMIN) {
      return true
    }

    return role === user.role
  }
}
