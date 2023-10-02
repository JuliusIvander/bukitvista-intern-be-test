import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { FavoriteMovie } from './entities/favorite-movie.entity';

interface FavMovieRes {
  Response?: string;
  Poster?: string;
}

@Injectable()
export class FavoriteMovieService {
  constructor(
    @InjectRepository(FavoriteMovie)
    private favMovieRepo: Repository<FavoriteMovie>,
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async getFavoriteMovieByUserId(userId: string): Promise<string[] | []> {
    const favList = await this.favMovieRepo.findBy({ userId });
    return favList.map((mv) => mv.imgUrl);
  }

  async getMovieByTitle(title: string): Promise<string | null> {
    const apiKey = this.configService.get<string>('API_KEY');
    const title_url = title.replace(/\s/g, '-');
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${title_url}`;

    const result = await this.httpService.axiosRef.get<FavMovieRes>(url);
    if (result.data.Response === 'False' || result.data.Poster === 'N/A') {
      return null;
    }
    return result.data.Poster;
  }

  async addFavoriteMovie(
    userId: string,
    title: string,
  ): Promise<FavoriteMovie | null> {
    const imgUrl = await this.getMovieByTitle(title);
    if (imgUrl) {
      const userFavMovie = new FavoriteMovie();
      userFavMovie.title = title;
      userFavMovie.imgUrl = imgUrl;
      userFavMovie.userId = userId;

      return this.favMovieRepo.save(userFavMovie);
    }
    return null;
  }
}
