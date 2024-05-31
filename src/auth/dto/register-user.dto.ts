import { IsEmail, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class RegisterUserDto {

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(2)
    name: string;

    @IsEmail()
    email: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(4)
    password: string;
}
