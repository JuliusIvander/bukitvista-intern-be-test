import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { User, UserLoginData } from '../user/entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  signUp(data: SignUpDto): Promise<User> {
    const saltRound = this.configService.get<string>('SALT') || '10';

    return this.userService.create({
      ...data,
      password: bcrypt.hashSync(data.password, parseInt(saltRound, 10)),
    });
  }

  async signIn(data: SignInDto): Promise<UserLoginData> {
    const user = await this.userService.findByUsername(data.username);

    const isAccessGranted = await bcrypt.compare(data.password, user?.password);
    if (!isAccessGranted) throw new UnauthorizedException();

    return {
      token: await this.jwtService.signAsync({
        id: user.id,
        username: user.username,
      }),
    };
  }
}
