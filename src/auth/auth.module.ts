import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.contants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      // Cualquier servicio puede usar el jwt
      global: true,
      // Palabra secreta para verificar que el token que se generó es válido
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
