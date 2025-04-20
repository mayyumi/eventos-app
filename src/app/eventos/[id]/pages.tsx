// 'use client'

// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import axios from 'axios'
// import { useParams } from 'next/navigation'
// import { Button } from '@/components/ui/button'

// type Participante = {
//   id: number
//   nome: string
//   email: string
//   checkins: { id: number; hora_saida: string | null }[]
// }

// type Evento = {
//   id: number
//   nome: string
//   data: string
//   hora_inicio: string
//   hora_fim: string
//   local: string
// }

// export default function EventoPage() {
//   const params = useParams()
//   const eventoId = params?.id as string
//   const queryClient = useQueryClient()

//   // const { data: participantes, isLoading } = useQuery<Participante[]>({
//   //   queryKey: ['participantes', eventoId],
//   //   queryFn: async () => {
//   //     const res = await axios.get(`/api/eventos/${eventoId}/participantes`)
//   //     return res.data
//   //   },
//   // })

//   const { data: evento } = useQuery<Evento>({
//     queryKey: ['evento', eventoId],
//     queryFn: async () => {
//       const res = await axios.get(`/api/eventos/${eventoId}`)
//       return console.log(res.data)
//       return res.data
//     },
//   })

//   const mutation = useMutation({
//     mutationFn: async ({ participanteId, action }: { participanteId: number; action: 'checkin' | 'checkout' }) => {
//       await axios.post(`/api/checkin`, { participanteId, action })
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['participantes', eventoId] })
//     },
//   })

//   const handleCheck = (id: number, action: 'checkin' | 'checkout') => {
//     mutation.mutate({ participanteId: id, action })
//   }

//   return (
//     <div className="p-4 space-y-4">
//       {evento && (
//         <div className="space-y-1">
//           <h1 className="text-xl font-bold">{evento.nome}</h1>
//           <p className="text-sm text-gray-600">
//             {evento.data} | {evento.hora_inicio} - {evento.hora_fim}
//           </p>
//           <p className="text-sm text-gray-600">{evento.local}</p>
//         </div>
//       )}

//       {/* <h2 className="text-lg font-semibold mt-4">Participantes</h2>
//       {isLoading ? (
//         <p>Carregando participantes...</p>
//       ) : (
//         <ul className="space-y-3">
//           {participantes?.map((p) => {
//             const checkinAtivo = p.checkins.some((c) => c.hora_saida === null)
//             return (
//               <li key={p.id} className="bg-white shadow rounded-2xl p-4">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p className="font-semibold">{p.nome}</p>
//                     <p className="text-sm text-gray-500">{p.email}</p>
//                   </div>
//                   {checkinAtivo ? (
//                     <Button variant="destructive" size="sm" onClick={() => handleCheck(p.id, 'checkout')}>
//                       Check-out
//                     </Button>
//                   ) : (
//                     <Button size="sm" onClick={() => handleCheck(p.id, 'checkin')}>
//                       Check-in
//                     </Button>
//                   )}
//                 </div>
//               </li>
//             )
//           })}
//         </ul>
//       )} */}
//     </div>
//   )
// }
