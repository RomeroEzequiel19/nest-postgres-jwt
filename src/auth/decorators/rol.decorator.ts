import { SetMetadata } from "@nestjs/common";
import { ROLE } from "../../common/enums/rol.enum";

// SetMetaData nos permite agregarle informacion al request. Le agregamos la palabra adicional del rol que necesita
export const ROLES_KEY = "roles"

export const Roles = (role: ROLE) => SetMetadata(ROLES_KEY, role)