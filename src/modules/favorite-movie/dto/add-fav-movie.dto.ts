import { IsNotEmpty } from 'class-validator';

export class AddFavMovieDto {
  @IsNotEmpty()
  title: string;
}
