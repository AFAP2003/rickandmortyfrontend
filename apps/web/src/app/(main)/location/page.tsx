'use client'
import { Card } from '@/components/shadcn-ui/card'
import CharacterApi from '@/lib/apis/character.api'
import { getLocations } from '@/lib/local-storage'
import { Badge, Loader2, MapPin, Users } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function locationPage() {
  const { characterDetail, isloading, fetchCharacterById } = CharacterApi()
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [locations, setLocations] = useState(getLocations())
  const [characters, setCharacters] = useState<any[]>([])

  const loadCharactersForLocation = async (locationName: string) => {
    const location = locations.find((loc) => loc.locationName === locationName)
    if (!location || location.characterIds.length === 0) {
      setCharacters([])
      return
    }

    // Fetch characters using the IDs from the location
    const results = await Promise.all(
      location.characterIds.map((id: string) => fetchCharacterById(id))
    )
    if (results) {
      setCharacters(results)
    }
  }

  useEffect(() => {
    if (selectedLocation) {
      loadCharactersForLocation(selectedLocation)
    } else {
      setCharacters([])
    }
  }, [selectedLocation])

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'alive':
        return {
          bg: 'bg-green-500',
          text: 'text-green-400',
          shadow: 'shadow-[0_0_8px_rgba(34,197,94,1)]'
        }
      case 'dead':
        return {
          bg: 'bg-red-500',
          text: 'text-red-400',
          shadow: 'shadow-[0_0_8px_rgba(239,68,68,1)]'
        }
      default: // unknown or any other status
        return {
          bg: 'bg-gray-500',
          text: 'text-gray-400',
          shadow: 'shadow-[0_0_8px_rgba(156,163,175,1)]'
        }
    }
  }

  return (
    <div className='animate-fade-in space-y-8'>
      <div className='grid gap-6 bg-[url("/space.png")] bg-cover bg-center bg-no-repeat p-6 lg:grid-cols-3'>
        {/* Locations List */}
        <div className='space-y-3 lg:col-span-1'>
          <h2 className='text-foreground mb-4 flex items-center gap-2 text-xl font-bold'>
            <MapPin className='h-5 w-5 text-[#bede3d]' />
            <span className='text-white'>Locations ({locations.length})</span>
          </h2>

          <div className='space-y-2'>
            {locations.map((location) => (
              <Card
                key={location.locationName}
                onClick={() => setSelectedLocation(location.locationName)}
                className={`cursor-pointer border-2 border-black bg-black p-4 transition-all ${
                  selectedLocation === location.locationName
                    ? 'border-[#bede3d]'
                    : 'hover:border-[#bede3d]'
                }`}
              >
                <div className='flex items-center justify-between'>
                  <div className='min-w-0 flex-1'>
                    <h3 className='text-foreground truncate font-medium text-white'>
                      {location.locationName}
                    </h3>
                    <p className='text-muted-foreground mt-1 flex items-center gap-1 text-sm text-white'>
                      <Users className='h-3 w-3 text-white' />
                      {location.characterIds.length} character
                      {location.characterIds.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  {selectedLocation === location.locationName && (
                    <div className='animate-glow-pulse h-2 w-2 rounded-full bg-[#bede3d]' />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Characters in Selected Location */}
        <div className='lg:col-span-2'>
          {selectedLocation ? (
            <div className='space-y-4'>
              <h2 className='text-foreground flex items-center gap-2 text-xl font-bold'>
                <MapPin className='h-5 w-5 text-[#bede3d]' />
                <span className='text-white'>{selectedLocation}</span>
              </h2>

              {isloading ? (
                <div className='flex items-center justify-center py-20'>
                  <Loader2 className='h-8 w-8 animate-spin text-[#bede3d]' />
                </div>
              ) : (
                <div className='grid gap-4 sm:grid-cols-2'>
                  {characters.map((character: any) => {
                    const statusColors = getStatusColor(character.status)

                    return (
                      <Link key={character.id} href={`/detail/${character.id}`}>
                        <Card className='group overflow-hidden border-2 border-black bg-black transition-all hover:border-[#bede3d]'>
                          <div className='flex gap-4 p-4'>
                            <img
                              src={character.image}
                              alt={character.name}
                              className='h-20 w-20 rounded-[10px] object-cover transition-transform group-hover:scale-110'
                            />
                            <div className='min-w-0 flex-1'>
                              <h3 className='truncate font-bold text-white transition-colors group-hover:text-[#bede3d]'>
                                {character.name}
                              </h3>
                              <p className='text-sm text-gray-300'>
                                {character.species}
                              </p>
                              <div className='flex items-center gap-2'>
                                <span
                                  className={`h-2 w-2 rounded-full ${statusColors.bg} ${statusColors.shadow}`}
                                ></span>
                                <span className={statusColors.text}>
                                  {character.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          ) : (
            <Card className='border-2 border-black bg-black p-12 text-center'>
              <MapPin className='mx-auto mb-4 h-16 w-16 text-white' />
              <h3 className='mb-2 text-xl font-bold text-white'>
                Select a Location
              </h3>
              <p className='text-gray-300'>
                Choose a location from the list to view its characters
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
