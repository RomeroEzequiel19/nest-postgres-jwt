import { UseGuards, applyDecorators } from "@nestjs/common";
import { ROLE } from "../../common/enums/rol.enum";
import { Roles } from "./rol.decorator";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";

export function Auth(role: ROLE) {

    return applyDecorators(
        Roles(role),
        UseGuards(AuthGuard, RolesGuard)
    )

}