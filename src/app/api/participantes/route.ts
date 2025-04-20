
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const participantes = await prisma.participante.findMany(
            // {
            //   where: { evento_id: parseInt(eventoId) },
            //   include: {
            //     checkins: {
            //       where: {
            //         hora_saida: null // Só considera check-in em aberto
            //       },
            //     },
            //   },
            // }
        )
        return NextResponse.json(participantes);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar eventos' }, { status: 500 });
    }
}