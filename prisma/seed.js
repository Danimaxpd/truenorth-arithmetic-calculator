const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const addition = await prisma.Operation.upsert({
    where: {
      type: "addition",
    },
    update: {},
    create: {
      type: "addition",
      cost: 10,
      deleted: false,
    },
  });
  const subtraction = await prisma.Operation.upsert({
    where: {
      type: "subtraction",
    },
    update: {},
    create: {
      type: "subtraction",
      cost: 10,
      deleted: false,
    },
  });
  const multiplication = await prisma.Operation.upsert({
    where: {
      type: "multiplication",
    },
    update: {},
    create: {
      type: "multiplication",
      cost: 10,
      deleted: false,
    },
  });
  const division = await prisma.Operation.upsert({
    where: {
      type: "division",
    },
    update: {},
    create: {
      type: "division",
      cost: 10,
      deleted: false,
    },
  });
  const square_root = await prisma.Operation.upsert({
    where: {
      type: "square_root",
    },
    update: {},
    create: {
      type: "square_root",
      cost: 10,
      deleted: false,
    },
  });
  const random_string = await prisma.Operation.upsert({
    where: {
      type: "random_string",
    },
    update: {},
    create: {
      type: "random_string",
      cost: 15,
      deleted: false,
    },
  });
  console.info({
    addition,
    subtraction,
    multiplication,
    division,
    square_root,
    random_string,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
