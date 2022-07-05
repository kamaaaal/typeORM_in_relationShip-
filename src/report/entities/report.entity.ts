// import { IsOptional } from "class-validator";
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Content: string;

  @ManyToOne(() => User, (user: User) => user.reports,{
    //   eager : true
  })
  @JoinColumn({
    name: 'user',
    referencedColumnName: 'name',
  })
  user: User;
}
