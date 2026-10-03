import { prisma } from "../lib/prisma.ts";
import type { User } from "@prisma/client";
class UserAuthRepository {
  // Create a new user in the database
  async createUser(userData: User): Promise<User> {
    const userdata = await prisma.user.create({
      data: userData, 
    });
    return userdata;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: userData,
    });
    return updatedUser;
  }

  // Find a user by email and ensure they are verified
  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  // Find a user by ID
  async findUserById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  // this method is used to find all users based on a query. If no query is provided, it will return all users.
  async findAllUsers(query?: any): Promise<User[]> {
    return await prisma.user.findMany({
      where: query,
    });
  }
}

export default UserAuthRepository;
