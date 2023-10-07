import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ForbiddenException,
  UseGuards,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';

import { FavoriteMovieService } from './favorite-movie.service';
import { AddFavMovieDto } from './dto/add-fav-movie.dto';

import { AuthGuard } from '../auth/auth.guard';
import { User } from '../../decorators/user.decorator';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';

@Controller('movies')
@UseInterceptors(TransformInterceptor)
export class FavoriteMovieController {
  constructor(private readonly favoriteMovieService: FavoriteMovieService) {}

  @Get()
  movies() {
    throw new ForbiddenException();
  }

  @Post('/favorite')
  @UseGuards(AuthGuard)
  async addFavoriteMovie(
    @User('id') userId: string,
    @Body() { title }: AddFavMovieDto,
  ) {
    const result = await this.favoriteMovieService.addFavoriteMovie(
      userId,
      title,
    );
    if (result) {
      return result;
    }
    throw new BadRequestException();
  }

  @Get('/favorite')
  @UseGuards(AuthGuard)
  async getFavoriteMovies(@User('id') userId: string) {
    return {
      posters: await this.favoriteMovieService.getFavoriteMovieByUserId(userId),
    };
  }

  @Get('/:title')
  @UseGuards(AuthGuard)
  async getMovie(@Param('title') title: string) {
    return {
      poster: await this.favoriteMovieService.getMovieByTitle(title),
    };
  }
}
