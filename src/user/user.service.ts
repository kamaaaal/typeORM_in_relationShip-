import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    ) {}

  findRaw(){
    return this.userRepository.query(`select * from public."userREL"`);
  }

  findAllRelation() {
    return this.userRepository.find({relations : ["reports"]});
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async findAll() {
    const raw =  await this.userRepository.createQueryBuilder('user')
    .leftJoinAndSelect("user.reports","report")
    .getRawMany()
    return this.userRepository.create(raw)
    // .execute();
  }

  findOne(name: string) {
    console.log('Called fin ond');
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.reports', 'report')
      .where({ name: name })
      .getMany();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
