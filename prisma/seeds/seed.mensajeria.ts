/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SEED — Mensajes_BD
 *  Tablas: SubscriptionPlan, Chat, Message
 *  ⚠️  Requiere que seed.usuarios.ts y seed.matches.ts hayan corrido primero.
 *       matchId 1 = Juan↔Maria  |  matchId 2 = Carlos↔Sofia
 *  Ejecutar: npm run seed:mensajeria
 * ─────────────────────────────────────────────────────────────────────────────
 */

import 'dotenv/config';
import { PrismaClient } from '@prisma/client-mensajeria';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// IDs de usuarios (de Usuarios_BD)
const USER_JUAN   = 1;
const USER_MARIA  = 2;
const USER_CARLOS = 3;
const USER_SOFIA  = 4;

// IDs de matches (de Matches_BD, autoincrement 1 y 2)
const MATCH_JUAN_MARIA   = 1;
const MATCH_CARLOS_SOFIA = 2;

const pool    = new Pool({ connectionString: process.env.DATABASE_URL_MENSAJERIA });
const adapter = new PrismaPg(pool);
const prisma  = new PrismaClient({ adapter } as any);

async function main() {
  console.log('\n🌱  [Mensajes_BD] Iniciando seed...\n');

  // ── 1. Planes de Suscripción ───────────────────────────────────────────────

  const planes = [
    {
      tier: 'FREE' as const,
      name: 'Gratis',
      description: 'Plan básico para empezar a conectar.',
      price: 0,
      features: ['5 likes diarios', '1 foto de perfil', 'Acceso básico'],
    },
    {
      tier: 'BRONZE' as const,
      name: 'Bronce',
      description: 'Más visibilidad para conectar con más personas.',
      price: 4.99,
      features: ['25 likes diarios', '3 fotos de perfil', 'Ver quién te dio like'],
    },
    {
      tier: 'GOLD' as const,
      name: 'Oro',
      description: 'Experiencia premium con acceso a funciones avanzadas.',
      price: 14.99,
      features: ['Likes ilimitados', '5 fotos de perfil', 'Rewind ilimitado', 'Passport'],
    },
    {
      tier: 'PREMIUM' as const,
      name: 'Premium',
      description: 'Lo mejor de Tindel para encontrar tu conexión ideal.',
      price: 24.99,
      features: [
        'Todas las funciones de Oro',
        '10 fotos de perfil',
        'Boost mensual gratis',
        'Prioridad en el feed',
      ],
    },
    {
      tier: 'PLATINUM' as const,
      name: 'Platino',
      description: 'Máxima exclusividad y prioridad absoluta.',
      price: 39.99,
      features: [
        'Todas las funciones de Premium',
        'Prioridad en likes',
        'Mensaje antes de hacer match',
        'Soporte prioritario 24/7',
      ],
    },
  ];

  for (const plan of planes) {
    await prisma.subscriptionPlan.upsert({
      where: { tier: plan.tier },
      update: { name: plan.name, description: plan.description, price: plan.price, features: plan.features },
      create: plan,
    });
  }

  console.log('✅  Planes de suscripción creados:', planes.length);

  // ── 2. Chats ───────────────────────────────────────────────────────────────

  const chatJuanMaria = await prisma.chat.upsert({
    where: { matchId: MATCH_JUAN_MARIA },
    update: {},
    create: { matchId: MATCH_JUAN_MARIA },
  });

  const chatCarlosSofia = await prisma.chat.upsert({
    where: { matchId: MATCH_CARLOS_SOFIA },
    update: {},
    create: { matchId: MATCH_CARLOS_SOFIA },
  });

  console.log('✅  Chats creados:', {
    chatJuanMaria: chatJuanMaria.id,
    chatCarlosSofia: chatCarlosSofia.id,
  });

  // ── 3. Mensajes ────────────────────────────────────────────────────────────

  const mensajes = [
    // Chat Juan ↔ Maria
    {
      chatId: chatJuanMaria.id,
      fromId: USER_JUAN,
      content: '¡Hola Maria! Vi que tienes gustos muy parecidos a los míos. ¿Cómo estás? 😊',
    },
    {
      chatId: chatJuanMaria.id,
      fromId: USER_MARIA,
      content: '¡Hola Juan! Muy bien, gracias. ¡Qué coincidencia lo del cine! ¿Cuál es tu película favorita?',
    },
    {
      chatId: chatJuanMaria.id,
      fromId: USER_JUAN,
      content: 'Difícil elegir una sola... pero me quedo con Inception. ¿Y tú?',
    },
    {
      chatId: chatJuanMaria.id,
      fromId: USER_MARIA,
      content: 'Me encanta! Yo diría que Amélie. ¿Quedamos para verla juntos algún día? 🎬',
    },
    // Chat Carlos ↔ Sofia
    {
      chatId: chatCarlosSofia.id,
      fromId: USER_CARLOS,
      content: '¡Sofia! Vi tus fotos de fotografía, tienes un ojo increíble para los detalles. ✨',
    },
    {
      chatId: chatCarlosSofia.id,
      fromId: USER_SOFIA,
      content: '¡Muchas gracias Carlos! La fotografía es mi pasión. ¿Tú haces algún deporte?',
    },
    {
      chatId: chatCarlosSofia.id,
      fromId: USER_CARLOS,
      content: 'Sí, juego al tenis los fines de semana. ¿Te gustaría venir a ver un partido? 🎾',
    },
    {
      chatId: chatCarlosSofia.id,
      fromId: USER_SOFIA,
      content: '¡Claro que sí! Podría llevar mi cámara y capturar el momento 📸',
    },
  ];

  for (const msg of mensajes) {
    await prisma.message.create({ data: msg });
  }

  console.log('✅  Mensajes creados:', mensajes.length);
  console.log('\n🎉  [Mensajes_BD] Seed completado con éxito.\n');
}

main()
  .catch((e) => { console.error('❌  Error en seed de Mensajes_BD:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); await pool.end(); });
