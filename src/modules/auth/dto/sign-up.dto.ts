import { IsNotEmpty, Matches } from 'class-validator';

const passwordRegEx = /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*){8,32}$/g;
const usernameRegEx = /^[a-zA-Z0-9]{5,32}$/g;

export class SignUpDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Matches(usernameRegEx, {
    message:
      'Username must contain Minimum 5 and Maximum 32 characters, no special character',
  })
  username: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message:
      'Password must contain Minimum 8 and Maximum 32 characters, at least one uppercase letter, one lowercase letter and one number',
  })
  password: string;
}
