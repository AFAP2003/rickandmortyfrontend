// app/characters/[id]/page.tsx
import NotFound from '@/app/not-found'
import { API_URL } from '@/lib/constants'

export default async function CharacterPage({ params }: { params: { id: string } }) {
  // Fetch character data
  const res = await fetch(`${API_URL}/${params.id}`)
  const data = await res.json()

  // If API returns error or invalid data → show not found
  if (!res.ok || data.error) {
    return <NotFound />                                                                                 
  }

  // Otherwise, render normally
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <p>Status: {data.status}</p>
      <p>Species: {data.species}</p>
    </div>
  )
}
