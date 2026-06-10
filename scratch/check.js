const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const users = await prisma.user.findMany();
  console.log("Users in DB:", users);
  const user = await prisma.user.findUnique({ where: { email: 'juan@example.com' } });
  console.log("Juan:", user);
  const subs = await prisma.subscriptionPlan.findMany();
  console.log("Subs:", subs);
}
check().finally(() => prisma.$disconnect());
