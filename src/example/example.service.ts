import { Inject, Injectable } from '@nestjs/common';
import { UUID_GENERATOR } from '../common/providers/uuid.provider';

@Injectable()
export class ExampleService {
  constructor(@Inject(UUID_GENERATOR) private readonly generateUuid: () => string) {}

  createId(): string {
    return this.generateUuid();
  }
}
