import { v4 } from 'uuid';

export const UUID_GENERATOR = 'UUID';

export const uuidProvider = {
  provide: UUID_GENERATOR,
  useValue: v4,
};
