import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from '../auth/dto/sign-up.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(data: SignUpDto): Promise<User> {
    const newUser = new User();
    newUser.name = data.name;
    newUser.username = data.username;
    newUser.password = data.password;

    return this.userRepository.save(newUser);
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  findById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }
}
