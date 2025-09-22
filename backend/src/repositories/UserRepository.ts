import { PrismaClient, User, UserRole } from '@prisma/client';
import { BaseRepository } from './BaseRepository';

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: UserRole;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  emailVerified?: boolean;
  lastLogin?: Date;
}

export class UserRepository extends BaseRepository<User> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.user);
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.model.findUnique({
        where: { email },
      });
      return user as User | null;
    } catch (error) {
      throw new Error(`Failed to find user by email: ${error}`);
    }
  }

  async findByRole(role: UserRole): Promise<User[]> {
    try {
      const users = await this.model.findMany({
        where: { role },
      });
      return users as User[];
    } catch (error) {
      throw new Error(`Failed to find users by role: ${error}`);
    }
  }

  async createUser(data: CreateUserData): Promise<User> {
    try {
      const user = await this.model.create({
        data: {
          ...data,
          role: data.role || UserRole.CLIENT,
        },
      });
      return user as User;
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  async updateUser(id: string, data: UpdateUserData): Promise<User> {
    try {
      const user = await this.model.update({
        where: { id },
        data,
      });
      return user as User;
    } catch (error) {
      throw new Error(`Failed to update user: ${error}`);
    }
  }

  async updateLastLogin(id: string): Promise<User> {
    try {
      const user = await this.model.update({
        where: { id },
        data: {
          lastLogin: new Date(),
        },
      });
      return user as User;
    } catch (error) {
      throw new Error(`Failed to update last login: ${error}`);
    }
  }

  async verifyEmail(id: string): Promise<User> {
    try {
      const user = await this.model.update({
        where: { id },
        data: {
          emailVerified: true,
        },
      });
      return user as User;
    } catch (error) {
      throw new Error(`Failed to verify email: ${error}`);
    }
  }

  async getUsersWithPagination(options: {
    page: number;
    limit: number;
    search?: string;
    role?: UserRole;
  }): Promise<{ data: User[]; total: number; totalPages: number }> {
    const { page, limit, search, role } = options;
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (role) {
      where.role = role;
    }

    return this.paginate({
      page,
      limit,
      where,
      orderBy: { createdAt: 'desc' },
    });
  }
}

export default UserRepository;