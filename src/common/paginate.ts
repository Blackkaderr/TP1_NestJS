import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export function paginate<T extends ObjectLiteral>(
  query: SelectQueryBuilder<T>,
  page: number,
  limit: number,
): Promise<T[]> {
  return query.skip((page - 1) * limit).take(limit).getMany();
}
