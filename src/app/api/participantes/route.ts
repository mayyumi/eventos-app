import { prisma } from '@/lib/db';
// import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const participantes = await prisma.participante.findMany({
    where: { eventoId: Number(params.id) },
    include: { checkins: true }
  });

  return Response.json(participantes);
}
