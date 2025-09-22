import { PrismaClient } from '@prisma/client';
import { BaseEntity, IRepository, QueryOptions } from '@/types';

export abstract class BaseRepository<T extends BaseEntity> implements IRepository<T> {
  protected prisma: PrismaClient;
  protected model: any;

  constructor(prisma: PrismaClient, model: any) {
    this.prisma = prisma;
    this.model = model;
  }

  async findById(id: string, options?: QueryOptions): Promise<T | null> {
    try {
      const result = await this.model.findUnique({
        where: { id },
        ...this.buildQueryOptions(options),
      });
      return result as T | null;
    } catch (error) {
      throw new Error(`Failed to find record by ID: ${error}`);
    }
  }

  async findMany(options?: QueryOptions): Promise<T[]> {
    try {
      const result = await this.model.findMany({
        ...this.buildQueryOptions(options),
      });
      return result as T[];
    } catch (error) {
      throw new Error(`Failed to find records: ${error}`);
    }
  }

  async create(data: Omit<T, keyof BaseEntity>): Promise<T> {
    try {
      const result = await this.model.create({
        data,
      });
      return result as T;
    } catch (error) {
      throw new Error(`Failed to create record: ${error}`);
    }
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    try {
      const result = await this.model.update({
        where: { id },
        data,
      });
      return result as T;
    } catch (error) {
      throw new Error(`Failed to update record: ${error}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.model.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Failed to delete record: ${error}`);
    }
  }

  async count(options?: QueryOptions): Promise<number> {
    try {
      const result = await this.model.count({
        where: options?.where,
      });
      return result;
    } catch (error) {
      throw new Error(`Failed to count records: ${error}`);
    }
  }

  protected buildQueryOptions(options?: QueryOptions): Record<string, any> {
    if (!options) return {};

    const queryOptions: Record<string, any> = {};

    if (options.include) {
      queryOptions.include = options.include;
    }

    if (options.where) {
      queryOptions.where = options.where;
    }

    if (options.orderBy) {
      queryOptions.orderBy = options.orderBy;
    }

    if (options.skip !== undefined) {
      queryOptions.skip = options.skip;
    }

    if (options.take !== undefined) {
      queryOptions.take = options.take;
    }

    return queryOptions;
  }

  // Helper method for pagination
  protected async paginate(options: {
    page: number;
    limit: number;
    where?: Record<string, any>;
    include?: Record<string, any>;
    orderBy?: Record<string, any>;
  }): Promise<{ data: T[]; total: number; totalPages: number }> {
    const { page, limit, where, include, orderBy } = options;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.model.findMany({
        skip,
        take: limit,
        where,
        include,
        orderBy,
      }),
      this.model.count({ where }),
    ]);

    return {
      data: data as T[],
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}

export default BaseRepository;