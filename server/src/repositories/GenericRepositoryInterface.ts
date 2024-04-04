export interface GenericRepositoryInterface<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  findOne(filter: Partial<T>): Promise<T | null>;
  create(entity: T): Promise<T>;
  update(id: string, newData: Partial<T>, userId?: string): Promise<T | null>;
  delete(id: string, userId?: string): Promise<T | null>;
}
