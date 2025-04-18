import { prisma } from "@/lib/db";

// POST { participanteId, eventoId }
export async function POST(req: Request) {
    const { participanteId, eventoId } = await req.json();
  
    const checkin = await prisma.checkin.create({
      data: {
        participanteId,
        eventoId,
        hora_entrada: new Date(),
        status: 'presente'
      }
    });
  
    return Response.json(checkin);
  }
  
  // PUT { checkinId }
  export async function PUT(req: Request) {
    const { checkinId } = await req.json();
  
    const update = await prisma.checkin.update({
      where: { id: checkinId },
      data: {
        hora_saida: new Date(),
        status: 'saiu'
      }
    });
  
    return Response.json(update);
  }
  