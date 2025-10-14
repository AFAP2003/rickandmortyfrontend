'use client'
import SearchBox from '@/components/search-box'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/shadcn-ui/card'
import { useEffect } from 'react'
import ProfileApi from '@/lib/apis/character.api'
import Link from 'next/link'
export default function Home() {
  const { characters, isloading, fetchCharacters } = ProfileApi()
  useEffect(() => {
    fetchCharacters('')
  }, [])
  return (
    <div className="min-h-screen w-full bg-[url('/space.png')] bg-cover bg-center bg-no-repeat p-6">
      <div className='flex min-h-screen w-full flex-col items-center justify-start gap-10'>
        <Image src='/rick&mortytitle.png' alt='Logo' width={300} height={300} />
        <div className='w-full'>
          <SearchBox />
        </div>
        <div className='flex h-full w-full items-center justify-center gap-4'>
          <hr className='flex-1 border-t-2 border-[#42b1cc]' />
          <h1 className='font-bold text-white'>List of Characters</h1>
          <hr className='flex-1 border-t-2 border-[#42b1cc]' />
        </div>
        <div className='flex h-full w-full flex-col items-center justify-center gap-10'>
          {characters.map((character, index) => (
          <Link href={`/detail/${character.id}`} key={index} className='w-full md:w-1/2'> 
            <Card
              key={index}
              className='relative mt-10 w-full max-w-sm border-2 border-[#42b1cc] bg-gradient-to-br from-[#0d5759]/90 via-[#165c5f]/80 to-[#1a4d4f]/90 shadow-[0_0_20px_rgba(66,177,204,0.6),inset_0_0_60px_rgba(66,177,204,0.2),inset_0_0_100px_rgba(66,177,204,0.1)] backdrop-blur-sm'
            >
              <CardHeader className='pb-4 pt-12'>
                <div className='absolute -top-10 left-1/2 -translate-x-1/2'>
                  <div className='overflow-hidden rounded-full border-4 border-[#42b1cc] bg-white shadow-[0_0_15px_rgba(66,177,204,0.8)]'>
                    <Image
                      src={character.image}
                      alt={`avatar`}
                      width={80}
                      height={80}
                      className='h-20 w-20 object-cover'
                    />
                  </div>
                </div>
                <CardTitle className='mt-2 text-center text-xl font-bold text-white'>
                  {character.name}
                </CardTitle>
                <CardDescription className='flex items-center justify-center gap-2 text-center text-sm'>
                  <span className='h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,1)]'></span>
                  <span className='text-green-400'>{character.species}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className='pb-6 text-center'>
                <p className='text-sm text-gray-300'>Earth (C-137)</p>
              </CardContent>
            </Card>
          </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
