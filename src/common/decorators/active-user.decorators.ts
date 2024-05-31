import { ExecutionContext, createParamDecorator } from "@nestjs/common";

// Siempre tiene que existir un usuario
// Recibe una funcion de flecha
// tiene que retornar el request.user
// Con el execution contect se puede accdeder al request
// Con esto se devuelve al user

export const ActiveUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()

        return request.user
    }
)