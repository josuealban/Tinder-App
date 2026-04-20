import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash('admin123', 10);

  console.log('Seeding data...');

  // Create Subscription Plans
  const plans = [
    {
      tier: 'FREE',
      name: 'Gratis',
      description: 'Plan básico para empezar',
      price: 0,
      features: ['5 likes diarios', '1 foto de perfil'],
    },
    {
      tier: 'BRONZE',
      name: 'Bronce',
      description: 'Más visibilidad para conectar',
      price: 4.99,
      features: ['25 likes diarios', '3 fotos de perfil', 'Ver quién te dio like'],
    },
    {
      tier: 'GOLD',
      name: 'Oro',
      description: 'Experiencia premium completa',
      price: 14.99,
      features: ['Likes ilimitados', '5 fotos de perfil', 'Rewind ilimitado', 'Passport'],
    },
    {
      tier: 'PREMIUM',
      name: 'Premium',
      description: 'Lo mejor de Tindel',
      price: 24.99,
      features: ['Todas las funciones de Oro', '10 fotos de perfil', 'Boost mensual gratis'],
    },
    {
      tier: 'PLATINUM',
      name: 'Platino',
      description: 'Máxima exclusividad',
      price: 39.99,
      features: ['Todas las funciones de Premium', 'Prioridad en likes', 'Mensaje antes de hacer match'],
    },
  ];

  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { tier: plan.tier as any },
      update: plan as any,
      create: plan as any,
    });
  }

  console.log('Subscription plans created.');

  // Create Users
  const juan = await prisma.user.upsert({
    where: { email: 'juan@example.com' },
    update: {},
    create: {
      email: 'juan@example.com',
      password: password,
      name: 'Juan Perez',
      age: 25,
      gender: 'MALE',
      city: 'Madrid',
      country: 'España',
      hobbies: ['fútbol', 'videojuegos', 'cine'],
      photos: {
        create: [
          { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e', isPrimary: true },
        ]
      }
    },
  });

  const maria = await prisma.user.upsert({
    where: { email: 'maria@example.com' },
    update: {},
    create: {
      email: 'maria@example.com',
      password: password,
      name: 'Maria Garcia',
      age: 24,
      gender: 'FEMALE',
      city: 'Madrid',
      country: 'España',
      hobbies: ['música', 'viajes', 'arte'],
      photos: {
        create: [
          { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', isPrimary: true },
        ]
      }
    },
  });

  const carlos = await prisma.user.upsert({
    where: { email: 'carlos@example.com' },
    update: {},
    create: {
      email: 'carlos@example.com',
      password: password,
      name: 'Carlos Rodriguez',
      age: 28,
      gender: 'MALE',
      city: 'Barcelona',
      country: 'España',
      hobbies: ['tenis', 'lectura', 'cocina'],
    },
  });

  console.log('Users created:', { juanID: juan.id, mariaID: maria.id, carlosID: carlos.id });

  // Create some interactions (Likes)
  await prisma.interaction.upsert({
    where: { fromId_toId: { fromId: juan.id, toId: maria.id } },
    update: {},
    create: {
      fromId: juan.id,
      toId: maria.id,
      type: 'LIKE',
    }
  });

  await prisma.interaction.upsert({
    where: { fromId_toId: { fromId: maria.id, toId: juan.id } },
    update: {},
    create: {
      fromId: maria.id,
      toId: juan.id,
      type: 'LIKE',
    }
  });

  console.log('Interactions created.');
  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
