const { classException } = require("../../helpers/throw_functions");
const { validateRecordRequest } = require("../../helpers/validations")

class Record {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async createRecord(record) {
        try {
            if (!validateRecordRequest(record)) {
                throw classException(`Could not create record the body have a wrong format`, 400);
            }

            return await this.prisma.record.create({
                data: {
                    amount: record.amount,
                    user_balance: record.user_balance,
                    operation_response: record.operation_response,
                    user: { connect: { id: record.userId } },
                    operation: { connect: { type: record.operationType } },
                },
            });
        } catch (error) {
            if (error.code && error.message) {
                throw error;
            }
            throw classException(`Could not create record`, 200);
        }
    }

    async getRecords(skip, take, orderBy, where) {
        try {
            if (orderBy && orderBy.length) {
                orderBy = JSON.parse(orderBy);
            }
            if (where && where.length) {
                where = JSON.parse(where);
            }
            const [records, totalCount] = await Promise.all([
                this.prisma.record.findMany({
                    skip: skip,
                    take: take,
                    orderBy: orderBy,
                    where: where,
                }),
                this.prisma.record.count({ where: where }),
            ]);
            const currentPage = skip / take + 1;
            const totalPages = Math.ceil(totalCount / take);
            return {
                records: records,
                metadata: {
                    totalCount: totalCount,
                    currentPage: currentPage,
                    totalPages: totalPages,
                },
            };
        } catch (error) {
            if (error.code && error.message) {
                throw error;
            }
            throw classException(`Could not get records`, 200);
        }
    }

    async getRecordById(id) {
        try {
            if (!id) {
                throw classException(`Invalid or missing ID`, 400);
            }
            if (id && typeof id !== "number") {
                id = parseInt(id, 10);
            }
            if (isNaN(id)) {
                throw classException(`Invalid or missing ID`, 400);
            }
            return await this.prisma.record.findUnique({
                where: { id },
            });
        } catch (error) {
            if (error.code && error.message) {
                throw error;
            }
            throw classException(`Could not get record`, 200);
        }
    }

    async updateRecord(id, data) {
        try {
            if (!id) {
                throw classException("ID is required", 400);
            }
            if (!data.amount || !data.user_balance || !data.operation_response) {
                throw classException("At least one of amount, user_balance or operation_response is required", 400);
            }
            return await this.prisma.record.update({ where: { id }, data });
        } catch (error) {
            if (error.code && error.message) {
                throw error;
            }
            throw classException(`Could not update operation`, 200);
        }
    }

    async deleteRecord(id) {
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
          const deletedUser = await this.prisma.record.update({
            where: { id },
            data: { deleted: true },
          });
          return deletedUser;
        } catch (error) {
          if (error.code && error.message) {
            throw error;
          }
          throw classException(`Could not delete user`, 200);
        }
      }
}

module.exports = Record;