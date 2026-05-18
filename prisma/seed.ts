/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SEED PRINCIPAL — Orquestador
 *  Ejecuta los 3 seeds en el orden correcto según dependencias entre BDs:
 *    1. seeds/seed.usuarios.ts   → Usuarios_BD  (User, Profile, Photo)
 *    2. seeds/seed.matches.ts    → Matches_BD   (Interaction, Match)
 *    3. seeds/seed.mensajeria.ts → Mensajes_BD  (SubscriptionPlan, Chat, Message)
 *
 *  Ejecutar: npm run seed
 *            npx prisma db seed
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { execSync } from 'child_process';

function runSeed(name: string, file: string) {
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`▶  Ejecutando seed: ${name}`);
  console.log('─'.repeat(60));
  try {
    execSync(`tsx ${file}`, { stdio: 'inherit' });
  } catch {
    console.error(`\n❌  Falló el seed "${name}". Abortando.`);
    process.exit(1);
  }
}

console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║              TINDEL — SEED COMPLETO                     ║');
console.log('╚══════════════════════════════════════════════════════════╝');

runSeed('Usuarios_BD  (User + Profile + Photo)',          'prisma/seeds/seed.usuarios.ts');
runSeed('Matches_BD   (Interaction + Match)',             'prisma/seeds/seed.matches.ts');
runSeed('Mensajes_BD  (SubscriptionPlan + Chat + Message)', 'prisma/seeds/seed.mensajeria.ts');

console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║          ✅  SEED COMPLETO FINALIZADO                   ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');
