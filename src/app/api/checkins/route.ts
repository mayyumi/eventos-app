// import { prisma } from '@/lib/db';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (data.tipo === 'entrada') {
      const checkin = await prisma.checkin.create({
        data: {
          participante_id: data.participante_id,
          evento_id: data.evento_id,
          hora_entrada: new Date(),
          hora_saida: new Date(),
          status: 'presente',
        },
      });
      return NextResponse.json(checkin);
    }

    if (data.tipo === 'saida') {
      const checkin = await prisma.checkin.updateMany({
        where: {
          participante_id: data.participante_id,
          evento_id: data.evento_id,
          hora_saida: null,
        },
        data: {
          hora_saida: new Date(),
          status: 'saiu',
        },
      });
      return NextResponse.json({ status: 'Saída registrada', checkin });
    }

    return NextResponse.json({ error: 'Tipo inválido' }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ error: 'Erro ao registrar check-in/out' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const checkins = await prisma.checkin.findMany();
    return NextResponse.json(checkins);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar check-ins' }, { status: 500 });
  }
}
