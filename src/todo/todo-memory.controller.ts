import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoMemoryService } from './todo-memory.service';

@Controller({ path: 'todo', version: '1' })
export class TodoMemoryController {
  constructor(private readonly service: TodoMemoryService) {}

  @Post()
  addTodo(@Body() dto: CreateTodoDto) {
    return this.service.addTodo(dto);
  }

  @Get()
  getAll() {
    return this.service.getAll();
  }
}
