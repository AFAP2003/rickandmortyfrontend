'use client'
import { Card } from '@/components/shadcn-ui/card'
import { Badge } from '@/components/shadcn-ui/badge'
import CharacterApi from '@/lib/apis/character.api'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowLeft, CheckCircle2, Loader2, MapPin } from 'lucide-react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/shadcn-ui/dialog'
import { Button } from '@/components/shadcn-ui/button'
import { Label } from '@/components/shadcn-ui/label'
import { Input } from '@/components/shadcn-ui/input'
import {
  assignCharacterToLocation,
  getCharacterLocation,
  getLocations
} from '@/lib/local-storage'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function DetailPage() {
  const { characterDetail, isloading, fetchCharacterById } = CharacterApi()
  const params = useParams()
  const characterId = params?.slug?.[0]
  const [locationName, setLocationName] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [assignedLocation, setAssignedLocation] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    if (characterId) {
      fetchCharacterById(characterId)
    }
  }, [characterId])

  useEffect(() => {
    // Update assigned location when component mounts or characterId changes
    if (isMounted && characterId && typeof window !== 'undefined') {
      const location = getCharacterLocation(characterId)
      setAssignedLocation(location)
    }
  }, [isMounted, characterId])

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'alive':
        return 'bg-green-500 text-white'
      case 'dead':
        return 'bg-red-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const handleAssignLocation = () => {
    if (!locationName.trim()) {
      toast.error('Please enter a location name')
      return
    }

    const locations = getLocations()
    const existingLocation = locations.find(
      (loc) =>
        loc.locationName.toLowerCase() === locationName.trim().toLowerCase()
    )

    if (
      existingLocation &&
      !existingLocation.characterIds.includes(characterId || '')
    ) {
      const success = assignCharacterToLocation(
        characterId || '',
        locationName.trim()
      )
      if (success) {
        setAssignedLocation(locationName.trim())
        setIsDialogOpen(false)
        setLocationName('')
        toast.success(`Character assigned to ${locationName.trim()}`)
      }
    } else if (!existingLocation) {
      const success = assignCharacterToLocation(
        characterId || '',
        locationName.trim()
      )
      if (success) {
        setAssignedLocation(locationName.trim())
        setIsDialogOpen(false)
        setLocationName('')
        toast.success(`New location created: ${locationName.trim()}`)
      }
    } else {
      toast.error('Character already in this location')
    }
  }

  // Wait for client-side mount
  if (!isMounted) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[url('/space.png')] bg-cover bg-center p-6">
        <Loader2 className='text-primary h-12 w-12 animate-spin' />
      </div>
    )
  }

  // Show loading state
  if (isloading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[url('/space.png')] bg-cover bg-center p-6">
        <Loader2 className='text-primary h-12 w-12 animate-spin' />
      </div>
    )
  }

  // Show error state if data failed to load
  if (!characterDetail) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[url('/space.png')] bg-cover bg-center p-6">
        <div className='text-2xl text-white'>Character not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[url('/space.png')] bg-cover bg-center bg-no-repeat p-6">
      <Link href='/'>
        <Button
          variant='outline'
          className='border-primary/50 hover:bg-primary/10 mb-6 rounded-[7px] border-[#42b1cc] bg-black text-white'
        >
          <ArrowLeft className='mr-2 h-4 w-4 text-white' />
          Back to Characters
        </Button>
      </Link>

      <div className='grid gap-8 md:grid-cols-2'>
        <Card className='bg-gradient-card border-border/50 overflow-hidden'>
          <img
            src={characterDetail.image}
            alt={characterDetail.name}
            className='aspect-square w-full object-cover'
          />
        </Card>

        <Card className='border-[#42b1cc] bg-gradient-to-br from-[#0d5759]/90 via-[#165c5f]/80 to-[#1a4d4f]/90 p-6 text-white shadow-[0_0_20px_rgba(66,177,204,0.6),inset_0_0_60px_rgba(66,177,204,0.2),inset_0_0_100px_rgba(66,177,204,0.1)] backdrop-blur-sm'>
          <div className='space-y-4'>
            <div className='flex items-start justify-between'>
              <h1 className='text-foreground text-3xl font-bold md:text-4xl'>
                {characterDetail.name}
              </h1>
              <Badge className={`${getStatusColor(characterDetail.status)} rounded-full border-0`}>
                {characterDetail.status}
              </Badge>
            </div>

            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div>
                <p className='text-muted-foreground'>Species</p>
                <p className='text-foreground font-medium'>
                  {characterDetail.species}
                </p>
              </div>
              <div>
                <p className='text-muted-foreground'>Gender</p>
                <p className='text-foreground font-medium'>
                  {characterDetail.gender}
                </p>
              </div>
            </div>

            <div className='border-border/50 space-y-2 border-t pt-4'>
              <div>
                <p className='text-muted-foreground text-sm'>Origin</p>
                <p className='text-foreground'>
                  {characterDetail.origin?.name || '-'}
                </p>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>
                  Last known location
                </p>
                <p className='text-foreground'>
                  {characterDetail.location?.name || '-'}
                </p>
              </div>
            </div>

            {assignedLocation && (
              <div className='bg-accent/10 border-accent/30 flex items-center gap-2 rounded-lg border p-4'>
                <CheckCircle2 className='text-accent h-5 w-5' />
                <div className='flex-1'>
                  <p className='text-muted-foreground text-sm'>Assigned to</p>
                  <p className='text-foreground font-medium'>
                    {assignedLocation}
                  </p>
                </div>
              </div>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className='bg-[#bede3d] rounded-[10px] hover:bg-primary/90 text-primary-foreground shadow-portal w-full'>
                  <MapPin className='mr-2 h-4 w-4' />
                  {assignedLocation ? 'Change Location' : 'Assign to Location'}
                </Button>
              </DialogTrigger>
              <DialogContent className='bg-card border-border/50'>
                <DialogHeader>
                  <DialogTitle>Assign Character to Location</DialogTitle>
                  <DialogDescription>
                    Enter a location name. If the location doesn't exist, it
                    will be created.
                  </DialogDescription>
                </DialogHeader>
                <div className='space-y-4'>
                  <div>
                    <Label htmlFor='location'>Location Name</Label>
                    <Input
                      id='location'
                      placeholder='e.g., Earth C-137'
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      className='bg-background border-border/50'
                      onKeyPress={(e) =>
                        e.key === 'Enter' && handleAssignLocation()
                      }
                    />
                  </div>
                  <Button
                    onClick={handleAssignLocation}
                    className='bg-primary hover:bg-primary/90 text-primary-foreground w-full'
                  >
                    Assign Location
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>

      {characterDetail.episode && characterDetail.episode.length > 0 && (
        <Card className='mt-8  border-[#42b1cc] bg-gradient-to-br from-[#0d5759]/90 via-[#165c5f]/80 to-[#1a4d4f]/90 p-6 shadow-[0_0_20px_rgba(66,177,204,0.6),inset_0_0_60px_rgba(66,177,204,0.2),inset_0_0_100px_rgba(66,177,204,0.1)] backdrop-blur-sm'>
          <h2 className='text-foreground mb-4 text-2xl font-bold text-white'>
            Episodes ({characterDetail.episode.length})
          </h2>
          <div className='grid max-h-[400px] grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3'>
            {characterDetail.episode.map((episode: any) => (
              <div
                key={episode.id}
                className='bg-muted/30 border-border/30 hover:border-primary/50 rounded-lg hover:border-[#bede3d] p-3 transition-colors'
              >
                <p className='text-accent font-mono text-xs text-[#bede3d]'>
                  {episode.episode}
                </p>
                <p className='text-foreground text-sm text-white'>{episode.name}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}