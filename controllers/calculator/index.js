const Calculator = require("../../services/calculator");
const Record = require("../../services/record");
const { classException } = require("../../helpers/throw_functions");

class CalculatorController {
  constructor(fastify) {
    this.fastify = fastify;
    this.recordService = new Record(fastify.prisma);
  }

  async getOperationCost(operationType) {
    try {
      const OperationCost = await this.fastify.prisma.Operation.findUnique({
        where: { type: operationType },
      });
      return OperationCost.cost;
    } catch (error) {
      return 0;
    }
  }

  async callOperation(operationType, a, b, length) {
    let result;
    switch (operationType) {
      case "addition":
        result = await Calculator.add(parseInt(a), parseInt(b));
        break;
      case "subtraction":
        result = await Calculator.subtract(parseInt(a), parseInt(b));
        break;
      case "multiplication":
        result = await Calculator.multiply(parseInt(a), parseInt(b));
        break;
      case "division":
        result = await Calculator.divide(parseInt(a), parseInt(b));
        break;
      case "square_root":
        result = await Calculator.squareRoot(parseInt(a), parseInt(b));
        break;
      case "random_string":
        result = await Calculator.randomString(parseInt(length));
        break;

      default:
        result = false;
        break;
    }

    return result;
  }

  async performOperation(userId, operationType, a, b, length) {
    try {
      const operationsType = [
        "addition",
        "subtraction",
        "multiplication",
        "division",
        "square_root",
        "random_string",
      ];

      if (!operationsType.includes(operationType)) {
        throw classException(`The operation type is not valid`, 400);
      }
      const operationCost = await this.getOperationCost(operationType);
      // Retrieve the user's current balance
      const user = await this.fastify.prisma.user.findUnique({
        where: { id: userId },
      });
      const userBalance = user?.balance || 0;

      // Check if the user's balance is sufficient
      if (userBalance < operationCost) {
        throw classException(
          `Insufficient balance, your current balance is ${userBalance}`,
          400
        );
      }

      const operationResult = await this.callOperation(
        operationType,
        a,
        b,
        length
      );
      if (!operationResult) {
        throw classException("Error Performing operation", 200);
      }
      // Deduct the operation cost from the user's balance and update the User model
      const newBalance = userBalance - operationCost;
      const updatedUser = await this.fastify.prisma.user.update({
        where: { id: userId },
        data: { balance: newBalance },
      });
      const amount = operationCost;
      const user_balance = newBalance;
      const operation_response = "Success";

      const record = await this.recordService.createRecord({amount, user_balance, operation_response, userId, operationType});

      return { updatedUser, record, operationResult };
    } catch (error) {
      if (error.code && error.message) {
        throw error;
      }
      throw classException("Error Performing operation", 500);
    }
  }
}

module.exports = CalculatorController;
