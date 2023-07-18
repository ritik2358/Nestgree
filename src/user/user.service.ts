import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
let fname = {} as any;
@Injectable()
export class UserService {


  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {

  }

  create(createUserDto: CreateUserDto): Promise<User> {
    let user: User = new User();
    user.fname = createUserDto.fname;
    user.lname = createUserDto.lname;
    user.age = createUserDto.age; return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneBy(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    let user: User = new User();
    user.fname = updateUserDto.fname;
    user.lname = updateUserDto.lname;
    user.age = updateUserDto.age;
    user.id = id;
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
