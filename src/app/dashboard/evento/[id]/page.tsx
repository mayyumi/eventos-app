// src/app/dashboard/evento/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function EventoPage() {
  const { id } = useParams()

  const { data: evento, isLoading: loadingEvento } = useQuery({
    queryKey: ['evento', id],
    queryFn: async () => (await axios.get(`/api/eventos/${id}`)).data,
    enabled: !!id,
  })

  console.log(evento)

 const { data: participantes, isLoading: loadingParticipantes } = useQuery({
    queryKey: ['participantes', id],
    queryFn: async () => (await axios.get(`/api/participantes/${id}`)).data,
    enabled: !!id,
  })
  console.log("participantes", participantes)

  if (loadingEvento || loadingParticipantes || !evento) {
    return <div className="p-4">Carregando...</div>
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">{evento.nome}</h1>
      <p className="text-gray-600">{evento.data} - {evento.hora_inicio} às {evento.hora_fim}</p>
      <p className="text-gray-600">Local: {evento.local}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700">Participantes</h2>
        {/* {participantes.length === 0 ? (
          <p className="text-gray-500 mt-2">Nenhum participante registrado ainda.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {participantes.map((p: any) => (
              <li key={p.id} className="bg-white p-3 rounded-lg shadow flex justify-between">
                <span className="font-medium text-gray-800">{p.nome}</span>
                <span className="text-sm text-gray-500">{p.email}</span>
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </div>
  )
}
