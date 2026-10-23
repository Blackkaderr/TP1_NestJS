import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateTodoDto } from './create-todo.dto';
import { StatusEnum } from '../status.enum';
import { validationMessages as messages } from './validation-messages';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsOptional()
  @IsEnum(StatusEnum, { message: messages.status })
  status?: StatusEnum;
}
