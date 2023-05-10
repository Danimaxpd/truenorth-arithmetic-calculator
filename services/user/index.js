const bcrypt = require("bcrypt");
const { classException } = require("../../helpers/throw_functions");
const { validateUserRequest } = require("../../helpers/validations");

class User {
  constructor(prisma) {
    this.prisma = prisma;
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

  async getUsers(skip, take, orderBy, where) {
    if (orderBy && orderBy.length) {
      orderBy = JSON.parse(orderBy);
    }
    if (where && where.length) {
      where = JSON.parse(where);
    }
    try {
      const [users, totalCount] = await Promise.all([
        this.prisma.user.findMany({
          skip: skip,
          take: take,
          orderBy: orderBy,
          where: where,
        }),
        this.prisma.user.count({ where: where }),
      ]);
      const currentPage = skip / take + 1;
      const totalPages = Math.ceil(totalCount / take);
      return {
        users: users,
        metadata: {
          totalCount: totalCount,
          currentPage: currentPage,
          totalPages: totalPages,
        },
      };
    } catch (error) {
      console.error(error.message);
      throw classException(`Could not get users`, 200);
    }
  }

  async getUserById(id) {
    try {
      if (!id) {
        throw classException(`Invalid or missing ID `, 400);
      }
      if (id && typeof id !== "number") {
        id = parseInt(id, 10);
      }
      if (isNaN(id)) {
        throw classException(`Invalid or missing ID `, 400);
      }

      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error(error.message);
      throw classException(`Could not get user`, 200);
    }
  }

  async updateUser(id, userData) {
    try {
      if (!id) {
        throw classException(`Invalid or missing ID `, 400);
      }
      if (id && typeof id !== "number") {
        id = parseInt(id, 10);
      }
      if (isNaN(id)) {
        throw classException(`Invalid or missing ID `, 400);
      }
      if (!userData) {
        throw classException(`The data of the user is required`, 400);
      }
      const passwordHash = userData.password
        ? await bcrypt.hash(userData.password, 10)
        : undefined;
      const dataToUpdate = passwordHash
        ? { ...userData, password: passwordHash }
        : userData;
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: dataToUpdate,
      });
      return updatedUser;
    } catch (error) {
      console.error(error.message);
      throw classException(`Could not update user`, 200);
    }
  }

  async deleteUser(id) {
    try {
      if (!id) {
        throw classException(`Invalid or missing ID `, 400);
      }
      if (id && typeof id !== "number") {
        id = parseInt(id, 10);
      }
      if (isNaN(id)) {
        throw classException(`Invalid or missing ID `, 400);
      }
      const deletedUser = await this.prisma.user.update({
        where: { id },
        data: { deleted: true, status: false },
      });
      return deletedUser;
    } catch (error) {
      console.error(error.message);
      throw classException(`Could not delete user`, 200);
    }
  }
}

module.exports = User;
