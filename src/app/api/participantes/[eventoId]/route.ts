// /api/eventos/[eventoId]/participantes/route.ts

import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { eventoId: string } }) {
  try {
    const { eventoId } = params

    const participantes = await prisma.participante.findMany({
      where: { evento_id: parseInt(eventoId) },
      include: {
        checkins: {
          where: {
            hora_saida: null // Só considera check-in em aberto
          },
        },
      },
    })

    return NextResponse.json(participantes)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erro ao buscar participantes' }, { status: 500 })
  }
}
