import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller({ path: 'todo', version: '2' })
export class TodoController {
  constructor(private readonly service: TodoService) {}

  @Post()
  addTodo(@Body() dto: CreateTodoDto) {
    return this.service.addTodo(dto);
  }

  @Patch(':id')
  updateTodo(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTodoDto) {
    return this.service.updateTodo(id, dto);
  }

}
