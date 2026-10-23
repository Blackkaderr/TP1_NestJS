import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { StatusEnum } from './status.enum';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly repository: Repository<TodoEntity>,
  ) {}

  addTodo(dto: CreateTodoDto): Promise<TodoEntity> {
    return this.repository.save(this.repository.create(dto));
  }

  async updateTodo(id: number, dto: UpdateTodoDto): Promise<TodoEntity> {
    await this.getTodoById(id);
    const todo = await this.repository.preload({ id, ...dto });
    if (!todo) this.notFound(id);
    return this.repository.save(todo);
  }

  async deleteTodo(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (!result.affected) this.notFound(id);
  }

  async softDeleteTodo(id: number): Promise<void> {
    await this.getTodoById(id);
    await this.repository.softDelete(id);
  }

  async restoreTodo(id: number): Promise<TodoEntity> {
    const result = await this.repository.restore(id);
    if (!result.affected) this.notFound(id);
    return this.getTodoById(id);
  }

  async getStats(): Promise<Record<StatusEnum, number>> {
    const rows = await this.repository.createQueryBuilder('todo')
      .select('todo.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('todo.status')
      .getRawMany<{ status: StatusEnum; count: string | number }>();
    const counts = {
      [StatusEnum.WAITING]: 0,
      [StatusEnum.IN_PROGRESS]: 0,
      [StatusEnum.DONE]: 0,
    };
    for (const row of rows) counts[row.status] = Number(row.count);
    return counts;
  }

  getAll(): Promise<TodoEntity[]> {
    return this.repository.find({ order: { id: 'ASC' } });
  }

  async getTodoById(id: number): Promise<TodoEntity> {
    const todo = await this.repository.findOne({ where: { id } });
    if (!todo) this.notFound(id);
    return todo;
  }

  private notFound(id: number): never {
    throw new NotFoundException(`Todo ${id} introuvable.`);
  }
}
