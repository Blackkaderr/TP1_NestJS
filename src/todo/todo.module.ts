import { TodoMemoryController } from './todo-memory.controller';
import { TodoMemoryService } from './todo-memory.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoMemoryController],
  providers: [TodoMemoryService],
})
export class TodoModule {}
