const { classException } = require('../../helpers/throw_functions');
const bcrypt = require('bcrypt');
const { validateUserRequest } = require('../../helpers/validations')

class UserController {
  constructor(prisma) {
    this.prisma = prisma
  }

  async createUser(user) {
    try {
      if (!user || !validateUserRequest(user)) {
        throw classException(`The data of the user is required`, 400);
      }
      const passwordHash = await bcrypt.hash(user.password, 10);
      const newUser = await this.prisma.user.create({
        data: { username: user.username, password: passwordHash },
      });
      return newUser;
    } catch (error) {
      console.error(error.message);
      throw classException(`Could not create user`, 200);
    }
  }

  async getUsers(skip = 0, take = 10, orderBy = { id: 'asc' }, where = {}) {
    try {
      const [users, totalCount] = await Promise.all([
        this.prisma.user.findMany({
          skip: skip,
          take: take,
          orderBy: orderBy,
          where: where
        }),
        this.prisma.user.count({ where: where })
      ]);
      const currentPage = skip / take + 1;
      const totalPages = Math.ceil(totalCount / take);
      return {
        users: users,
        metadata: {
          totalCount: totalCount,
          currentPage: currentPage,
          totalPages: totalPages
        }
      };
    } catch (error) {
      throw classException(`Could not get users: ${error.message}`, 200);
    }
  }

  async getUserById(id) {
    try {
      if (!id || (typeof id !== 'string' && typeof id !== 'number')) {
        throw classException(`Invalid or missing ID `, 400);
      }
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error) {
      throw classException(`Could not get user: ${error.message}`, 200);
    }
  }

  async updateUser(id, userData) {
    try {
      if (!id || (typeof id !== 'string' && typeof id !== 'number')) {
        throw classException(`Invalid or missing ID `, 400);
      }
      if (!userData) {
        throw classException(`The data of the user is required`, 400);
      }
      const passwordHash = await bcrypt.hash(user.password, 10);
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: { ...userData, password: passwordHash },
      });
      return updatedUser;
    } catch (error) {
      throw classException(`Could not update user: ${error.message}`, 200);
    }
  }

  async deleteUser(id) {
    try {
      if (!id || (typeof id !== 'string' && typeof id !== 'number')) {
        throw classException(`Invalid or missing ID `, 400);
      }
      const deletedUser = await prisma.record.update({
        where: { id: id },
        data: { deleted: true },
      });
      return deletedUser;
    } catch (error) {
      throw classException(`Could not delete user: ${error.message}`, 200);
    }
  }
}

module.exports = UserController;
