import { Inject, Injectable } from '@nestjs/common';
import { UUID_GENERATOR } from '../common/providers/uuid.provider';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoModel } from './todo.model';
import { StatusEnum } from './status.enum';

@Injectable()
export class TodoMemoryService {
  private readonly todos: TodoModel[] = [];

  constructor(@Inject(UUID_GENERATOR) private readonly uuid: () => string) {}

  addTodo(dto: CreateTodoDto): TodoModel {
    const todo = new TodoModel();
    todo.id = this.uuid();
    todo.name = dto.name;
    todo.description = dto.description;
    todo.createdAt = new Date();
    todo.status = StatusEnum.WAITING;
    this.todos.push(todo);
    return todo;
  }

  getAll(): TodoModel[] {
    return this.todos;
  }
}
