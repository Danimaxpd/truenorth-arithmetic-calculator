const CalculatorController = require('./');
const { classException } = require('../../helpers/throw_functions');

// Mocks
const mockFastify = {
    prisma: {
        Operation: {
            async findUnique({ where }) {
                if (where.type === 'addition') {
                    return { cost: 10 };
                } else {
                    return null;
                }
            },
        },
        user: {
            async findUnique({ where }) {
                if (where.id === 1) {
                    return { balance: 20 };
                } else if (where.id === 2) {
                    return { balance: 2 };
                } else {
                    return null;
                }
            },
            async update({ where, data }) {
                return { id: where.id, ...data };
            },
        },
        record: {
            async create(data) {
                return { ...data };
            },
        },
    },
};

describe('CalculatorController', () => {
    let calculatorController;

    beforeEach(() => {
        calculatorController = new CalculatorController(mockFastify);
    });

    describe('getOperationCost', () => {
        it('should return the cost of an operation given its type', async () => {
            const cost = await calculatorController.getOperationCost('addition');
            expect(cost).toBe(10);
        });

        it('should return 0 if the operation type is not found', async () => {
            const cost = await calculatorController.getOperationCost('unknown');
            expect(cost).toBe(0);
        });
    });

    describe('callOperation', () => {
        it('should call the appropriate Calculator method based on the operation type', async () => {
            const additionResult = await calculatorController.callOperation('addition', 2, 3);
            expect(additionResult).toBe(5);

            const subtractionResult = await calculatorController.callOperation('subtraction', 5, 3);
            expect(subtractionResult).toBe(2);

            const multiplicationResult = await calculatorController.callOperation('multiplication', 2, 3);
            expect(multiplicationResult).toBe(6);

            const divisionResult = await calculatorController.callOperation('division', 6, 3);
            expect(divisionResult).toBe(2);

            const squareRootResult = await calculatorController.callOperation('square_root', 16);
            expect(squareRootResult).toBe(4);

            const invalidResult = await calculatorController.callOperation('unknown', 2, 3);
            expect(invalidResult).toBe(false);
        });
    });

    describe("performOperation", () => {
        it("should perform the operation and update the user's balance and create a record", async () => {
            const operationType = "addition";
            const a = 5;
            const b = 10;
            const length = 0;
            const userId = 1;

            const result = await calculatorController.performOperation(
                userId,
                operationType,
                a,
                b,
                length
            );

            expect(result).toMatchInlineSnapshot(`
{
  "operationResult": 15,
  "record": {
    "data": {
      "amount": 10,
      "operation": {
        "connect": {
          "type": "addition",
        },
      },
      "operation_response": "Success",
      "user": {
        "connect": {
          "id": 1,
        },
      },
      "user_balance": 10,
    },
  },
  "updatedUser": {
    "balance": 10,
    "id": 1,
  },
}
`);
        });

        it("should throw an error if the user has insufficient balance", async () => {
            const operationType = "addition";
            const a = 5;
            const b = 10;
            const length = 0;
            const userId = 2;

            // Set the user's balance to a value less than the operation cost
            const fastifyMock = {
                prisma: {
                    Operation: {
                        async findUnique() {
                            return { type: "addition", cost: 30 };
                        },
                    },
                    user: {
                        async findUnique() {
                            return { id: 2, balance: 20 };
                        },
                    },
                },
            };
            calculatorController = new CalculatorController(fastifyMock);

            await expect(
calculatorController.performOperation(userId, operationType, a, b, length)
).rejects.toThrowErrorMatchingInlineSnapshot(`
{
  "message": "Insufficient balance, your current balance is 20",
}
`);
        });

        it("should throw an error if the operation type is invalid", async () => {
            const operationType = "invalid";
            const a = 5;
            const b = 10;
            const length = 0;
            const userId = 1;

            await expect(
calculatorController.performOperation(userId, operationType, a, b, length)
).rejects.toThrowErrorMatchingInlineSnapshot(`
{
  "message": "The operation type is not valid",
}
`);
        });

        it("should throw an error if there's an error performing the operation", async () => {
            const operationType = "addition";
            const a = "not a number";
            const b = 10;
            const length = 0;
            const userId = 1;

            await expect(
calculatorController.performOperation(userId, operationType, a, b, length)
).rejects.toThrowErrorMatchingInlineSnapshot(`
{
  "message": "Error Performing operation",
}
`);
        });
    });
});