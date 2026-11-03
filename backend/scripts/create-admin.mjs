
import 'dotenv/config';

import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

import * as argon2 from 'argon2';

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL não encontrada no .env');
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

  const rl = createInterface({
    input: stdin,
    output: stdout,
  });

  try {
    // Impede a criação de outro administrador inicial
    const quantidade = await prisma.funcionario.count();

    if (quantidade > 0) {
      console.log(
        'Já existem funcionários cadastrados. Operação cancelada.',
      );
      return;
    }

    console.log('\n=== CADASTRO DO ADMINISTRADOR INICIAL ===\n');

    const nome = await rl.question('Nome: ');
    const cpf = await rl.question('CPF: ');
    const nascimento = await rl.question('Data de nascimento (AAAA-MM-DD): ');

    const endereco = await rl.question('Endereço: ');
    const bairro = await rl.question('Bairro: ');
    const cidade = await rl.question('Cidade: ');
    const complemento = await rl.question('Complemento (opcional): ');
    const cep = await rl.question('CEP: ');
    const estado = await rl.question('Estado: ');
    const telefone = await rl.question('Telefone: ');

    const login = await rl.question('Login: ');
    const senha = await rl.question('Senha (mínimo 12 caracteres): ');
    const confirmacao = await rl.question('Confirme a senha: ');

    if (!nome.trim() || !cpf.trim() || !login.trim()) {
      throw new Error('Nome, CPF e login são obrigatórios.');
    }

    if (senha.length < 12) {
      throw new Error('A senha precisa ter pelo menos 12 caracteres.');
    }

    if (senha !== confirmacao) {
      throw new Error('As senhas não coincidem.');
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(nascimento)) {
      throw new Error('Data inválida. Utilize AAAA-MM-DD.');
    }

    const dataNascimento = new Date(
      `${nascimento}T00:00:00.000Z`,
    );

    if (Number.isNaN(dataNascimento.getTime())) {
      throw new Error('Data de nascimento inválida.');
    }

    // Protege a senha utilizando Argon2id
    const senhaHash = await argon2.hash(senha, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });

    const funcionario = await prisma.funcionario.create({
      data: {
        nome: nome.trim(),
        cpf: cpf.trim(),
        dataNascimento,
        endereco: endereco.trim(),
        bairro: bairro.trim(),
        cidade: cidade.trim(),
        complemento: complemento.trim() || null,
        cep: cep.trim(),
        estado: estado.trim(),
        telefone: telefone.trim(),
        login: login.trim(),
        senha: senhaHash,
        nivelAcesso: 'ADMIN',
        ativo: true,
      },

      select: {
        id: true,
        nome: true,
        login: true,
        nivelAcesso: true,
        ativo: true,
      },
    });

    console.log('\nAdministrador cadastrado com sucesso!');
    console.log(funcionario);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error('\nErro ao criar administrador:', error.message);
  process.exitCode = 1;
});
