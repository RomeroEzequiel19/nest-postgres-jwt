import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breed/entities/breed.entity';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { ROLE } from '../common/enums/rol.enum';

@Injectable()
export class CatsService {

  // Permite acceder a todos los metodos que tiene el repositorio
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>

  ) {}
    

  async create(createCatDto: CreateCatDto, user: UserActiveInterface) {

    const breed = await this.validateBreed(createCatDto.breed)

    // Se guarda la info todo bien
    const cat = this.catRepository.create({
      ...createCatDto, 
      breed, 
      userEmail: user.email
    });

    // Almacena en la base de datos
    return await this.catRepository.save(cat);
  }

  async findAll(user: UserActiveInterface) {

    if(user.role === ROLE.ADMIN){
      return await this.catRepository.find()
    }
    return await this.catRepository.find({
      where: {userEmail: user.email}
    })
  }

  async findOne(id: number, user: UserActiveInterface) {
    const cat = await this.catRepository.findOneBy({id})

    if(!cat) throw new BadRequestException("Cat not Found")
    
    this.validateOwnerShip(cat, user)

    return cat

  }

  async update(id: number, updateCatDto: UpdateCatDto, user: UserActiveInterface) {

    // Busco si existe el gato y si cumple con el rol y relacion
    await this.findOne(id, user)

    return await this.catRepository.update(id,{
      ...updateCatDto,
      breed: updateCatDto.breed ? await this.validateBreed(updateCatDto.breed): undefined,
      userEmail: user.email
    })
  }

  async remove(id: number, user: UserActiveInterface) {

    // Busco si existe el gato y si cumple con el rol y relacion
    await this.findOne(id, user)
    return await this.catRepository.softDelete({id})
  }

  // Métodos separados

  private validateOwnerShip(cat: Cat, user: UserActiveInterface) {
    if (user.role !== ROLE.ADMIN && cat.userEmail !== user.email) throw new UnauthorizedException()
  }

  // Verifica la raza
  private async validateBreed(breed: string) {

    const breedEntity = await this.breedRepository.findOneBy({name: breed})

    if(!breedEntity) throw new BadRequestException("Breed not found")

    return breedEntity

  }
}
