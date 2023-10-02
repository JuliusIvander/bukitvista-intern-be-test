import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { FavoriteMovie } from './entities/favorite-movie.entity';
import { FavoriteMovieService } from './favorite-movie.service';
import { FavoriteMovieController } from './favorite-movie.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    UserModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 3,
    }),
    TypeOrmModule.forFeature([FavoriteMovie]),
  ],
  controllers: [FavoriteMovieController],
  providers: [FavoriteMovieService],
})
export class FavoriteMovieModule {}
