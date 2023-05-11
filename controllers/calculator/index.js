const Calculator = require("../../services/calculator");
const Operation = require("../../services/operation");
const { classException } = require("../../helpers/throw_functions");

class CalculatorController {
  constructor(fastify) {
    this.fastify = fastify;
    this.CalculatorService = Calculator;
    this.OperationService = new Operation(fastify.prisma);
  }

  async getOperationCost(operationType) {
    try {
      const typeOperationCost = await prisma.typeOperationCost.findUnique({
        where: { name: operationType },
      });
      return typeOperationCost.cost;
    } catch (error) {
      return 0;
    }
  }

  async callOperation(operationType, a, b, length) {
    let result;
    switch (operationType) {
      case "addition":
        result = await this.CalculatorService.addition(
          parseInt(a),
          parseInt(b)
        );
        break;
      case "subtraction":
        result = await this.CalculatorService.subtraction(
          parseInt(a),
          parseInt(b)
        );
        break;
      case "multiplication":
        result = await this.CalculatorService.multiplication(
          parseInt(a),
          parseInt(b)
        );
        break;
      case "division":
        result = await this.CalculatorService.division(
          parseInt(a),
          parseInt(b)
        );
        break;
      case "square_root":
        result = await this.CalculatorService.square_root(
          parseInt(a),
          parseInt(b)
        );
        break;
      case "random_string":
        result = await this.CalculatorService.randomString(parseInt(length));
        break;

      default:
        result = false;
        break;
    }

    return result;
  }

  async performOperation(userId, operationType, a, b, length) {
    try {
      const operationCost = this.getOperationCost(operationType);
      // Retrieve the user's current balance
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const userBalance = user?.balance || 0;

      // Check if the user's balance is sufficient
      if (userBalance < operationCost) {
        throw classException("Insufficient balance", 400);
      }

      // Deduct the operation cost from the user's balance and update the User model
      const newBalance = userBalance - operationCost;
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { balance: newBalance },
      });
      const operationResult = await this.callOperation(operationType, a, b, length);

      if (!operationResult) {
        throw classException("Error Performing operation", 200);
      }

      const record = await prisma.record.create({
        data: {
          amount: operationCost,
          user_balance: newBalance,
          operation_response: "Success",
          user: { connect: { id: userId } },
          operation: { connect: { type: operationType } },
        },
      });

      return { updatedUser, record, operationResult };
    } catch (error) {
      throw classException("Error Performing operation", 500);
    }
  }
}

module.exports = { CalculatorController };
