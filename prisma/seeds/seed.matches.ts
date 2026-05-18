/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SEED — Matches_BD
 *  Tablas: Interaction, Match
 *  ⚠️  Requiere que seed.usuarios.ts haya corrido primero (IDs 1-4).
 *  Ejecutar: npm run seed:matches
 * ─────────────────────────────────────────────────────────────────────────────
 */

import 'dotenv/config';
import { PrismaClient } from '@prisma/client-matches';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// IDs generados por el seed de usuarios (autoincrement arranca en 1)
const USER_JUAN   = 1;
const USER_MARIA  = 2;
const USER_CARLOS = 3;
const USER_SOFIA  = 4;

const pool    = new Pool({ connectionString: process.env.DATABASE_URL_MATCHES });
const adapter = new PrismaPg(pool);
const prisma  = new PrismaClient({ adapter } as any);

async function main() {
  console.log('\n🌱  [Matches_BD] Iniciando seed...\n');

  // ── 1. Interacciones ───────────────────────────────────────────────────────
  //  Juan  → Maria  : LIKE       ─┐ generan Match 1
  //  Maria → Juan   : LIKE       ─┘
  //  Carlos → Sofia : SUPERLIKE  ─┐ generan Match 2
  //  Sofia  → Carlos: LIKE       ─┘
  //  Sofia  → Juan  : LIKE       (sin match recíproco)
  //  Juan   → Sofia : DISLIKE

  const interacciones = [
    { fromId: USER_JUAN,   toId: USER_MARIA,  type: 'LIKE'      as const },
    { fromId: USER_MARIA,  toId: USER_JUAN,   type: 'LIKE'      as const },
    { fromId: USER_CARLOS, toId: USER_SOFIA,  type: 'SUPERLIKE' as const },
    { fromId: USER_SOFIA,  toId: USER_CARLOS, type: 'LIKE'      as const },
    { fromId: USER_SOFIA,  toId: USER_JUAN,   type: 'LIKE'      as const },
    { fromId: USER_JUAN,   toId: USER_SOFIA,  type: 'DISLIKE'   as const },
  ];

  for (const inter of interacciones) {
    await prisma.interaction.upsert({
      where: { fromId_toId: { fromId: inter.fromId, toId: inter.toId } },
      update: {},
      create: inter,
    });
  }

  console.log('✅  Interacciones creadas:', interacciones.length);

  // ── 2. Matches ─────────────────────────────────────────────────────────────

  const matches = [
    { user1Id: USER_JUAN,   user2Id: USER_MARIA  }, // Match 1
    { user1Id: USER_CARLOS, user2Id: USER_SOFIA  }, // Match 2
  ];

  for (const match of matches) {
    await prisma.match.upsert({
      where: { user1Id_user2Id: { user1Id: match.user1Id, user2Id: match.user2Id } },
      update: {},
      create: match,
    });
  }

  console.log('✅  Matches creados:', matches.length);
  console.log('\n🎉  [Matches_BD] Seed completado con éxito.\n');
}

main()
  .catch((e) => { console.error('❌  Error en seed de Matches_BD:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); await pool.end(); });
