import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { eventoId: string } }) {
  try {
    const { eventoId } = params;
    const participantes = await prisma.participante.findMany({
      where: { evento_id: parseInt(eventoId) },
    });
    return NextResponse.json(participantes);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar participantes' }, { status: 500 });
  }
}
