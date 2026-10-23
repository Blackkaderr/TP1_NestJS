import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoMemoryController } from './todo-memory.controller';
import { TodoMemoryService } from './todo-memory.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController, TodoMemoryController],
  providers: [TodoService, TodoMemoryService],
  exports: [TodoService],
})
export class TodoModule {}
