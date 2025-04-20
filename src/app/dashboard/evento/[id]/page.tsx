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

  const { data: checkins } = useQuery({
    queryKey: ['checkins'],
    queryFn: async () => (await axios.get('/api/checkins')).data,
  })
  
  if (loadingEvento || loadingParticipantes || !evento) {
    return <div className="p-4">Carregando...</div>
  }

  

  const checkinsPresentes = checkins?.filter(
    (checkin: { status: string }) => checkin.status === 'presente'
  )

  const checkouts = checkins?.filter(
    (checkin: { status: string }) => checkin.status === 'saiu'
  )

  const pendentes = checkins?.filter(
    (checkin: { status: string }) => checkin.status === 'pendente'
  )

  return (
    <div className="p-4 space-y-6">
      {evento && (
        <div>
          <h1 className="text-2xl font-bold text-gray-700">{evento.nome}</h1>
          <p className="text-sm text-gray-600">
            {evento.data} | {evento.hora_inicio} - {evento.hora_fim} | {evento.local}
          </p>
        </div>
      )}

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Check-ins ativos" value={checkinsPresentes?.length || 0} color="green" icon="bi-check-circle" />
        <StatCard title="Check-outs" value={checkouts?.length || 0} color="red" icon="bi-box-arrow-right" />
        <StatCard title="Pendentes" value={pendentes?.length || 0} color="orange" icon="bi-hourglass-split" />
      </div>

      {/* Tabela de participantes */}
      {/* <div className="bg-white shadow rounded-2xl overflow-auto">
        <table className="table table-bordered table-hover w-full">
          <thead className="thead-light">
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {participantes.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center">
                  Nenhum participante encontrado
                </td>
              </tr>
            )}
            {participantes.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.email}</td>
                <td>
                  <span className="badge bg-secondary">
                    {p.status === 'checkin' ? 'Presente' : p.status === 'checkout' ? 'Saiu' : 'Pendente'}
                  </span>
                </td>
                <td>
                  {p.status === 'checkin' ? (
                    <button onClick={() => handleCheck(p.id, 'checkout')} className="btn btn-sm btn-danger">
                      Check-out
                    </button>
                  ) : (
                    <button onClick={() => handleCheck(p.id, 'checkin')} className="btn btn-sm btn-success">
                      Check-in
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  )
}

function StatCard({
  title,
  value,
  color,
  icon,
}: {
  title: string
  value: number
  color: 'green' | 'red' | 'orange'
  icon: string
}) {
  const bgColors: Record<string, string> = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    orange: 'bg-orange-400',
  }

  return (
    <div className={`shadow rounded-xl p-4 text-white ${bgColors[color]} flex items-center justify-between`}>
      <div>
        <h2 className="text-sm font-semibold">{title}</h2>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <i className={`bi ${icon} text-4xl opacity-50`} />
    </div>
  )
}
