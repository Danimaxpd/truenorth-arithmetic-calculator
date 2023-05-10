const { classException } = require("../../helpers/throw_functions");
class Operation {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createOperation(data) {
    try {
      if (!data.type || !data.cost) {
        throw classException("Type and cost are required", 400);
      }
      return await this.prisma.operation.create({ data });
    } catch (error) {
      console.error(error.message);
      throw classException(`Could not create operation`, 200);
    }
  }

  async getOperationById(id) {
    try {
      if (!id) {
        throw classException("ID is required", 400);
      }
      if (id && typeof id !== "number") {
        id = parseInt(id, 10);
      }
      if (isNaN(id)) {
        throw classException(`Invalid or missing ID `, 400);
      }
      return await this.prisma.operation.findUnique({ where: { id } });
    } catch (error) {
      console.error(error.message);
      throw classException(`Could not get operation`, 200);
    }
  }

  async getAllOperations(skip, take, orderBy, where) {
    try {
      if (orderBy && orderBy.length) {
        orderBy = JSON.parse(orderBy);
      }
      if (where && where.length) {
        where = JSON.parse(where);
      }

      const [operations, totalCount] = await Promise.all([
        this.prisma.operation.findMany({
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
        operations: operations,
        metadata: {
          totalCount: totalCount,
          currentPage: currentPage,
          totalPages: totalPages,
        },
      };
    } catch (error) {
      console.error(error.message);
      throw classException(`Could not get operations`, 200);
    }
  }

  async updateOperation(id, data) {
    try {
      if (!id) {
        throw classException("ID is required", 400);
      }
      if (!data.type && !data.cost) {
        throw classException("At least one of type or cost is required", 400);
      }
      return await this.prisma.operation.update({ where: { id }, data });
    } catch (error) {
      console.error(error.message);
      throw classException(`Could not update operation`, 200);
    }
  }

  async deleteOperation(id) {
    try {
      if (!id) {
        throw classException("ID is required", 400);
      }
      return await this.prisma.operation.delete({ where: { id } });
    } catch (error) {
      console.error(error.message);
      throw classException(`Could not delete the operation`, 200);
    }
  }
}

module.exports = Operation;
