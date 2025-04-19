// src/app/dashboard/page.tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function DashboardPage() {
  const { data: eventos } = useQuery({
    queryKey: ['eventos'],
    queryFn: async () => (await axios.get('/api/eventos')).data,
  })

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>

      {/* Cards principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total de Eventos" value={eventos?.length || 0} icon="bi-calendar-event" color="blue" />
        <Card title="Participantes" value={145} icon="bi-people" color="green" />
        <Card title="Check-ins" value={85} icon="bi-check-circle" color="purple" />
        <Card title="Pendentes" value={60} icon="bi-hourglass-split" color="orange" />
      </div>

      {/* Lista de eventos com responsividade */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-600">Eventos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {eventos?.map((evento: any) => (
            <div key={evento.id} className="bg-white p-4 rounded-2xl shadow space-y-1">
              <h3 className="text-lg font-bold text-gray-800">{evento.nome}</h3>
              <p className="text-sm text-gray-500">
                {evento.data} - {evento.hora_inicio} até {evento.hora_fim}
              </p>
              <p className="text-sm text-gray-600">Local: {evento.local}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Card({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: number
  icon: string
  color: string
}) {
  const bgColors: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
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
