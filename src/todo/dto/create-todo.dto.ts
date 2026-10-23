import { IsString, Length, MinLength } from 'class-validator';
import { validationMessages as messages } from './validation-messages';

export class CreateTodoDto {
  @IsString({ message: messages.nameString })
  @Length(3, 10, { message: messages.nameLength })
  name: string;

  @IsString({ message: messages.descriptionString })
  @MinLength(10, { message: messages.descriptionLength })
  description: string;
}
