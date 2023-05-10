const { PrismaClient } = require('@prisma/client');

class UserController {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(user) {
    try {
      const newUser = await this.prisma.user.create({
        data: user,
      });
      return newUser;
    } catch (error) {
      throw new Error(`Could not create user: ${error.message}`);
    }
  }

  async getUsers() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      throw new Error(`Could not get users: ${error.message}`);
    }
  }

  async getUserById(id) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error) {
      throw new Error(`Could not get user: ${error.message}`);
    }
  }

  async updateUser(id, userData) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: userData,
      });
      return updatedUser;
    } catch (error) {
      throw new Error(`Could not update user: ${error.message}`);
    }
  }

  async deleteUser(id) {
    try {
      const deletedUser =  await prisma.record.update({
        where: { id: id },
        data: { deleted: true },
      });
      return deletedUser;
    } catch (error) {
      throw new Error(`Could not delete user: ${error.message}`);
    }
  }
}

module.exports = UserController;
