import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1")

  app.useGlobalPipes(
    new ValidationPipe({
      // Admite datos que estén en la lista blanca
      whitelist: true,
      // Muestra error al cliente si quiere mandar otra cosa
      forbidNonWhitelisted: true,
      // Transforme automáticamente los datos
      transform: true,
    }),
  )

  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
