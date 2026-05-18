/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SEED — Usuarios_BD
 *  Tablas: User, Profile, Photo
 *  Ejecutar: npm run seed:usuarios
 * ─────────────────────────────────────────────────────────────────────────────
 */

import 'dotenv/config';
import { PrismaClient } from '@prisma/client-usuarios';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const pool    = new Pool({ connectionString: process.env.DATABASE_URL_USUARIOS });
const adapter = new PrismaPg(pool);
const prisma  = new PrismaClient({ adapter } as any);

async function main() {
  console.log('\n🌱  [Usuarios_BD] Iniciando seed...\n');

  const password = await bcrypt.hash('admin123', 10);

  // ── 1. Usuarios ────────────────────────────────────────────────────────────

  const juan = await prisma.user.upsert({
    where: { email: 'juan@example.com' },
    update: {},
    create: { email: 'juan@example.com', password, name: 'Juan Perez', age: 25 },
  });

  const maria = await prisma.user.upsert({
    where: { email: 'maria@example.com' },
    update: {},
    create: { email: 'maria@example.com', password, name: 'Maria Garcia', age: 24 },
  });

  const carlos = await prisma.user.upsert({
    where: { email: 'carlos@example.com' },
    update: {},
    create: { email: 'carlos@example.com', password, name: 'Carlos Rodriguez', age: 28 },
  });

  const sofia = await prisma.user.upsert({
    where: { email: 'sofia@example.com' },
    update: {},
    create: { email: 'sofia@example.com', password, name: 'Sofia Martinez', age: 22 },
  });

  console.log('✅  Usuarios creados:', {
    juan: juan.id, maria: maria.id, carlos: carlos.id, sofia: sofia.id,
  });

  // ── 2. Perfiles ────────────────────────────────────────────────────────────

  const perfiles = [
    {
      userId: juan.id,
      bio: 'Amante del fútbol y los videojuegos. Buscando una conexión real.',
      gender: 'MALE'   as const,
      city: 'Madrid', country: 'España', nationality: 'Española',
      hobbies: ['fútbol', 'videojuegos', 'cine'],
      zodiacSign: 'Aries', seeking: 'Relación seria', job: 'Ingeniero de Software',
      subscription: 'GOLD' as const, donationsEnabled: false, isRestricted: false,
    },
    {
      userId: maria.id,
      bio: 'Apasionada de la música y los viajes. La vida es una aventura.',
      gender: 'FEMALE' as const,
      city: 'Madrid', country: 'España', nationality: 'Española',
      hobbies: ['música', 'viajes', 'arte'],
      zodiacSign: 'Libra', seeking: 'Conocer gente', job: 'Diseñadora Gráfica',
      subscription: 'FREE' as const, donationsEnabled: false, isRestricted: false,
    },
    {
      userId: carlos.id,
      bio: 'Chef aficionado y lector empedernido.',
      gender: 'MALE'   as const,
      city: 'Barcelona', country: 'España', nationality: 'Española',
      hobbies: ['tenis', 'lectura', 'cocina'],
      zodiacSign: 'Tauro', seeking: 'Amistad', job: 'Abogado',
      subscription: 'BRONZE' as const, donationsEnabled: true, isRestricted: false,
    },
    {
      userId: sofia.id,
      bio: 'Fotógrafa y exploradora urbana. Café ☕ + naturaleza 🌿.',
      gender: 'FEMALE' as const,
      city: 'Valencia', country: 'España', nationality: 'Española',
      hobbies: ['fotografía', 'senderismo', 'yoga'],
      zodiacSign: 'Piscis', seeking: 'Relación seria', job: 'Fotógrafa Freelance',
      subscription: 'PREMIUM' as const, donationsEnabled: false, isRestricted: false,
    },
  ];

  for (const perfil of perfiles) {
    await prisma.profile.upsert({
      where: { userId: perfil.userId },
      update: {},
      create: perfil,
    });
  }

  console.log('✅  Perfiles creados.');

  // ── 3. Fotos ───────────────────────────────────────────────────────────────

  const fotosData = [
    { userId: juan.id,   url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e', isPrimary: true  },
    { userId: juan.id,   url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d', isPrimary: false },
    { userId: maria.id,  url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', isPrimary: true  },
    { userId: maria.id,  url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e', isPrimary: false },
    { userId: carlos.id, url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', isPrimary: true  },
    { userId: sofia.id,  url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', isPrimary: true  },
    { userId: sofia.id,  url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04', isPrimary: false },
  ];

  for (const foto of fotosData) {
    await prisma.photo.create({ data: foto });
  }

  console.log('✅  Fotos creadas:', fotosData.length);
  console.log('\n🎉  [Usuarios_BD] Seed completado con éxito.\n');
}

main()
  .catch((e) => { console.error('❌  Error en seed de Usuarios_BD:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); await pool.end(); });
