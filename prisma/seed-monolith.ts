import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('\n🌱 Iniciando seed monolítico...');

  // 1. Subscription Plans
  const plans = [
    { tier: 'FREE' as const, name: 'Gratis', description: 'Plan básico', price: 0, features: ['Swipes limitados'] },
    { tier: 'BRONZE' as const, name: 'Bronce', description: 'Plan bronce', price: 4.99, features: ['Más swipes'] },
    { tier: 'GOLD' as const, name: 'Oro', description: 'Plan oro', price: 9.99, features: ['Swipes ilimitados'] },
    { tier: 'PREMIUM' as const, name: 'Premium', description: 'Plan premium', price: 14.99, features: ['Ver a quién le gustas'] },
    { tier: 'PLATINUM' as const, name: 'Platino', description: 'Plan platino', price: 19.99, features: ['Todo incluido'] },
  ];
  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { tier: plan.tier },
      update: {},
      create: plan,
    });
  }
  console.log('✅ Subscription Plans creados.');

  // 2. Usuarios
  const password = await bcrypt.hash('admin123', 10);
  const juan = await prisma.user.upsert({
    where: { email: 'juan@example.com' },
    update: { role: 'ADMIN' },
    create: { 
      email: 'juan@example.com', password, name: 'Juan Perez', age: 25, role: 'ADMIN',
      bio: 'Amante del fútbol.', gender: 'MALE', city: 'Madrid', country: 'España',
      subscription: 'GOLD'
    },
  });

  const maria = await prisma.user.upsert({
    where: { email: 'maria@example.com' },
    update: {},
    create: { 
      email: 'maria@example.com', password, name: 'Maria Garcia', age: 24,
      bio: 'Música y viajes.', gender: 'FEMALE', city: 'Madrid', country: 'España',
      subscription: 'FREE'
    },
  });

  console.log('✅ Usuarios creados.');

  // 3. Fotos
  await prisma.photo.createMany({
    data: [
      { userId: juan.id, url: 'https://images.unsplash.com/photo-1', isPrimary: true },
      { userId: maria.id, url: 'https://images.unsplash.com/photo-2', isPrimary: true },
    ],
    skipDuplicates: true
  });
  console.log('✅ Fotos creadas.');

  console.log('\n🎉 Seed completado con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
