import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService
  ) {}


  // CanActive es el metodo de nest que se ejecuta antes de una petición. Allí verificamos si el token que enviamos es válido. Y si es válido lo dejamos pasar
  async canActivate(context: ExecutionContext,): Promise<boolean> {

    // Obtiene lo que envia el cliente
    const request = context.switchToHttp().getRequest();

    // Verifica si existe el token
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // Si el token que envia el cliente es igual al secreto que está en nuestra constante, si es correcto se lo deja seguir
      const payload = await this.jwtService.verifyAsync(token);
      console.log(payload);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request.user = payload;
      // console.log(request);

    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  //Metodo para extraer el token del header
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
