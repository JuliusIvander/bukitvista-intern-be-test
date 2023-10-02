import { Exclude } from 'class-transformer';
import { Column, OneToMany, Entity } from 'typeorm';

import { BaseEntity } from 'src/models/base.entity';
import { FavoriteMovie } from 'src/modules/favorite-movie/entities/favorite-movie.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 32 })
  name: string;

  @Column({ type: 'varchar', length: 32, unique: true })
  username: string;

  @Column({ type: 'varchar' })
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany(() => FavoriteMovie, (favoriteMovie) => favoriteMovie.user)
  favMovies: FavoriteMovie[];
}

export class UserLoginData {
  token: string;
}
