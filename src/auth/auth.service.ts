import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcryptjs from "bcryptjs"
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register({name, email, password}: RegisterUserDto) {
    const user = await this.usersService.findOneByEmail(email)
    
    if(user) {
      throw new BadRequestException("User already exists")
    }

    return await this.usersService.create({
      name, 
      email, 
      password: await bcryptjs.hash(password,10)
    })
  }

  async auth({email, password}: LoginUserDto) {
    const user = await this.usersService.findOneByEmailAndPassword(email)

    if(!user) {
      throw new UnauthorizedException(`User ${email} not found`)
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if(!isPasswordValid) {
      throw new UnauthorizedException(`Password ${password} not found`)
    }

    // Decimos que datos viajan en el token. Informacion pública
    const payload = {email: user.email, role: user.role}

    // El payload se manda en la firma
    const token = await this.jwtService.signAsync(payload)

    return { 
      token,
      email
    }
  
  }

  async profile({email, role}: {email: string, role: string}){

    // if(role !== "admin") {
    //   throw new UnauthorizedException("Usted no está autorizado para acceder a este recurso")
    // }


    return await this.usersService.findOneByEmail(email)
  }

}
