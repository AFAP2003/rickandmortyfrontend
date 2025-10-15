'use client'
import SearchBox from '@/components/search-box'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/shadcn-ui/card'
import { useEffect, useState } from 'react'
import ProfileApi from '@/lib/apis/character.api'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/shadcn-ui/pagination'
import CharacterPageSkeleton from './skeleton'

export default function Home() {
  const { pageInfo, characters, isloading, fetchCharacters } = ProfileApi()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchCharacters('', currentPage)
  }, [currentPage])

  useEffect(() => {
    // Debounce search - wait 500ms after user stops typing
    const timeoutId = setTimeout(() => {
      fetchCharacters(searchQuery, currentPage)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, currentPage])

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
      default:
        return {
          bg: 'bg-gray-500',
          text: 'text-gray-400',
          shadow: 'shadow-[0_0_8px_rgba(156,163,175,1)]'
        }
    }
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen w-full bg-[url('/space.png')] bg-cover bg-center bg-no-repeat p-6">
      {/* Container - max width for large screens */}
      <div className='mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-start gap-10'>
        
        {/* Logo - responsive sizing */}
        <Image 
          src='/rick&mortytitle.png' 
          alt='Logo' 
          width={300} 
          height={300}
          className='h-auto w-64 md:w-80 lg:w-96'
        />
        
        {/* Search Box - max width on large screens */}
        <div className='w-full max-w-2xl'>
          <SearchBox onSearch={handleSearch} />
        </div>
        
        {/* Title Section */}
        <div className='flex h-full w-full items-center justify-center gap-4'>
          <hr className='flex-1 border-t-2 border-[#42b1cc]' />
          <h1 className='whitespace-nowrap text-sm font-bold text-white md:text-base lg:text-lg'>
            {searchQuery ? `Search results for "${searchQuery}"` : 'List of Characters'}
          </h1>
          <hr className='flex-1 border-t-2 border-[#42b1cc]' />
        </div>

        {/* Skeleton Loading State - Grid Layout */}
        {isloading && (
          <div className='grid w-full grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {[...Array(8)].map((_, index) => (
              <CharacterPageSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Characters List - Grid Layout for Desktop */}
        {!isloading && characters && characters.length > 0 && (
          <div className='grid w-full grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {characters.map((character, index) => {
              const statusColors = getStatusColor(character.status)
              
              return (
                <Link
                  href={`/detail/${character.id}`}
                  key={character.id || index}
                  className='w-full'
                >
                  <Card className='relative mt-10 h-full w-full border-2 border-[#42b1cc] bg-gradient-to-br from-[#0d5759]/90 via-[#165c5f]/80 to-[#1a4d4f]/90 shadow-[0_0_20px_rgba(66,177,204,0.6),inset_0_0_60px_rgba(66,177,204,0.2),inset_0_0_100px_rgba(66,177,204,0.1)] backdrop-blur-sm transition-transform duration-200 hover:scale-105 active:scale-105'>
                    <CardHeader className='pb-4 pt-12'>
                      <div className='absolute -top-10 left-1/2 -translate-x-1/2'>
                        <div className='overflow-hidden rounded-full border-4 border-[#42b1cc] bg-white shadow-[0_0_15px_rgba(66,177,204,0.8)]'>
                          <Image
                            src={character.image}
                            alt={character.name}
                            width={80}
                            height={80}
                            className='h-20 w-20 object-cover'
                          />
                        </div>
                      </div>
                      <CardTitle className='mt-2 line-clamp-2 text-center text-xl font-bold text-white'>
                        {character.name}
                      </CardTitle>
                      <CardDescription className='flex flex-col items-center justify-center gap-2 text-center text-sm'>
                        <span className='text-gray-300'>{character.species}</span>

                        <div className='flex items-center justify-center gap-2'>
                          <span className={`h-2 w-2 rounded-full ${statusColors.bg} ${statusColors.shadow}`}></span>
                          <span className={statusColors.text}>{character.status}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='pb-6 text-center'>
                      <p className='line-clamp-1 text-sm text-gray-300'>
                        {character.origin?.name || 'Unknown'}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}

        {/* Pagination - Better spacing */}
        {!isloading && pageInfo.pages > 1 && (
          <Pagination className='py-10'>
            <PaginationContent className='gap-2 md:gap-4'>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
                  className={`cursor-pointer border-[#42b1cc] bg-black text-white hover:bg-[#42b1cc]/20 ${
                    currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                  }`}
                />
              </PaginationItem>

              <div className='flex items-center px-2 text-white md:px-4'>
                <span className='text-xs font-medium md:text-sm'>
                  Page {currentPage} of {pageInfo.pages}
                </span>
              </div>

              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < pageInfo.pages && handlePageClick(currentPage + 1)}
                  className={`cursor-pointer border-[#42b1cc] bg-black text-white hover:bg-[#42b1cc]/20 ${
                    currentPage === pageInfo.pages ? 'pointer-events-none opacity-50' : ''
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        {/* No Characters State */}
        {!isloading && (!characters || characters.length === 0) && (
          <div className='py-20 text-center text-white'>
            <p className='text-base md:text-lg'>
              {searchQuery 
                ? `No characters found for "${searchQuery}"`
                : 'No characters found'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}