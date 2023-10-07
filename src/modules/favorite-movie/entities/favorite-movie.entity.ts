import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from 'src/models/base.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class FavoriteMovie extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  imgUrl: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.favMovies)
  user: User;
}
