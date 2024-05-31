import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    return this.userRepository.save(user)
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({email})
  }

  // Busqueda personalizada
  findOneByEmailAndPassword(email: string) {
    return this.userRepository.findOne(
      {where: {email},
      select: ["id", "name", "password", "email", "role"]
    }
    )
  }

  //////////////////////////////////////////////////////////7

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
