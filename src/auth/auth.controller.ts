import { Body, Controller, Get, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ROLE } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorators';
import { ActiveUser } from 'src/common/decorators/active-user.decorators';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('register') 
  register(@Body() registerUserDto: RegisterUserDto){
    return this.authService.register(registerUserDto)
  }
  
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto){
    return this.authService.auth(loginUserDto)
  }

  // @Get('profile')
  // @Roles(ROLE.ADMIN)
  // @UseGuards(AuthGuard, RolesGuard)
  // profile(
  //   @Req()
  //   // Une el request de express y luego le inyectamos el usuario
  //   req: Request & RequestWithUser
  // ) {
  //   return this.authService.profile(req.user)
  // }

  @Get('profile')
  @Auth(ROLE.ADMIN)
  profile(@ActiveUser() user: UserActiveInterface) {
    return this.authService.profile(user)
  }

}
