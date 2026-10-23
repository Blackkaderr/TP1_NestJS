import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../../common/entities/timestamp.entity';
import { StatusEnum } from '../status.enum';

@Entity('todos')
export class TodoEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.WAITING })
  status: StatusEnum;
}
