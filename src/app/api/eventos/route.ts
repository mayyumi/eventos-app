import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const eventos = await prisma.evento.findMany({
    include: { participantes: true, checkins: true }
  });

  return NextResponse.json(eventos);
}
