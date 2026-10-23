import { Global, Module } from '@nestjs/common';
import { UUID_GENERATOR, uuidProvider } from './providers/uuid.provider';

@Global()
@Module({
  providers: [uuidProvider],
  exports: [UUID_GENERATOR],
})
export class CommonModule {}
