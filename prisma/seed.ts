import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin123', 10);

  console.log('Seeding data...');

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
