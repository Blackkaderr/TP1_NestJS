import { StatusEnum } from './status.enum';

export class TodoModel {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  status: StatusEnum;
}
