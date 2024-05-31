import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedService {

  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>
  ) {}

  async create(createBreedDto: CreateBreedDto) {
    const breed = this.breedRepository.create(createBreedDto)
    return this.breedRepository.save(breed)
  }

  async findAll() {
    return await this.breedRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} breed`;
  }

  update(id: number, updateBreedDto: UpdateBreedDto) {
    return `This action updates a #${id} breed`;
  }

  remove(id: number) {
    return `This action removes a #${id} breed`;
  }
}
