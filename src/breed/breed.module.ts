import { Module } from '@nestjs/common';
import { BreedService } from './breed.service';
import { BreedController } from './breed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Breed]), AuthModule],
  controllers: [BreedController],
  providers: [BreedService],
  exports: [TypeOrmModule]
})
export class BreedModule {}
