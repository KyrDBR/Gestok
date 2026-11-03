import 'dotenv/config';

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

import * as argon2 from 'argon2';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const funcionarios = await prisma.funcionario.findMany({
    select: {
      id: true,
      senha: true,
    },
  });

  let atualizados = 0;

  for (const funcionario of funcionarios) {
    if (funcionario.senha.startsWith('$argon2id$')) {
      continue;
    }

    const senhaHash = await argon2.hash(funcionario.senha, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });

    await prisma.funcionario.update({
      where: { id: funcionario.id },
      data: { senha: senhaHash },
    });

    atualizados++;
  }

  console.log(`${atualizados} senha(s) convertida(s).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });