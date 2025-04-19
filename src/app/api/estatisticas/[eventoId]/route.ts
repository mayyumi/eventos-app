import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { eventoId: string } }) {
  const eventoId = parseInt(params.eventoId);

  try {
    const totalParticipantes = await prisma.participante.count({
      where: { evento_id: eventoId },
    });

    const checkins = await prisma.checkin.findMany({
      where: { evento_id: eventoId },
    });

    const presentes = checkins.filter((c: { status: string; }) => c.status === 'presente').length;
    const saiu = checkins.filter((c: { status: string; }) => c.status === 'saiu').length;

    return NextResponse.json({
      totalParticipantes,
      presentes,
      saiu,
    });

  } catch (error) {
    return NextResponse.json({ error: 'Erro ao calcular estatísticas' }, { status: 500 });
  }
}
