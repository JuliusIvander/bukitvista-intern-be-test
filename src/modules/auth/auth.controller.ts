import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { ResponseMessage } from 'src/decorators/response-message.decorator';

@Controller('auth')
@UseInterceptors(TransformInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ResponseMessage('User has been created!')
  async signUp(@Body() signUpDto: SignUpDto) {
    const data = await this.authService.signUp(signUpDto);
    if (data) {
      return 'User has been created!';
    }
    throw new BadRequestException();
  }

  @Post('login')
  @ResponseMessage('User Logged In')
  @UseInterceptors(ClassSerializerInterceptor)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
