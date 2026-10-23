import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { StatusEnum } from '../status.enum';
import { validationMessages as messages } from './validation-messages';

export class QueryTodoDto {
  @IsOptional()
  @IsString({ message: messages.search })
  search?: string;

  @IsOptional()
  @IsEnum(StatusEnum, { message: messages.status })
  status?: StatusEnum;

  @Type(() => Number)
  @IsInt({ message: messages.page })
  @Min(1, { message: messages.page })
  @Max(Number.MAX_SAFE_INTEGER, { message: messages.page })
  page = 1;

  @Type(() => Number)
  @IsInt({ message: messages.limit })
  @Min(1, { message: messages.limit })
  @Max(100, { message: messages.limit })
  limit = 10;
}
