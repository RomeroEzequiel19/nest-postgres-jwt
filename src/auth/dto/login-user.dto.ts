import { Transform } from "class-transformer";
import { IsString, MinLength } from "class-validator";

export class LoginUserDto {

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(4)
    password: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(2)
    email: string;
}
