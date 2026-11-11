import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { AuthSimulationMiddleware } from './common/middlewares/auth-simulation.middleware';
import { ExampleModule } from './example/example.module';
import { TodoController } from './todo/todo.controller';
import { TodoEntity } from './todo/entities/todo.entity';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    ExampleModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [TodoEntity],
        synchronize: true,
      }),
    }),
    TodoModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthSimulationMiddleware).forRoutes(TodoController);
  }
}
