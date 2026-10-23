import { Body, Controller, Delete, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
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

  @Delete(':id')
  @HttpCode(204)
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteTodo(id);
  }

  @Delete(':id/soft')
  @HttpCode(204)
  softDeleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.service.softDeleteTodo(id);
  }

  @Patch(':id/restore')
  restoreTodo(@Param('id', ParseIntPipe) id: number) {
    return this.service.restoreTodo(id);
  }
}
