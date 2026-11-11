import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { RequestWithUserId } from '../common/types/request-with-user-id';
import { CreateTodoDto } from './dto/create-todo.dto';
import { QueryTodoDto } from './dto/query-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller({ path: 'todo', version: '2' })
export class TodoController {
  constructor(private readonly service: TodoService) {}

  @Post()
  addTodo(@Body() dto: CreateTodoDto, @Req() req: RequestWithUserId) {
    return this.service.addTodo(dto, req.userId);
  }

  @Get()
  getAll(@Query() query: QueryTodoDto) {
    return this.service.getAll(query);
  }

  @Get('stats')
  getStats() {
    return this.service.getStats();
  }

  @Get(':id')
  getTodoById(@Param('id', ParseIntPipe) id: number) {
    return this.service.getTodoById(id);
  }

  @Patch(':id')
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTodoDto,
    @Req() req: RequestWithUserId,
  ) {
    return this.service.updateTodo(id, dto, req.userId);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTodo(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUserId) {
    return this.service.deleteTodo(id, req.userId);
  }

  @Delete(':id/soft')
  @HttpCode(204)
  softDeleteTodo(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUserId) {
    return this.service.softDeleteTodo(id, req.userId);
  }

  @Patch(':id/restore')
  restoreTodo(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUserId) {
    return this.service.restoreTodo(id, req.userId);
  }
}
