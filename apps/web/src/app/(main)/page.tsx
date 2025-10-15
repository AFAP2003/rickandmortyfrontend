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
import { useEffect, useState } from 'react'
import ProfileApi from '@/lib/apis/character.api'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/shadcn-ui/button'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/shadcn-ui/pagination'

export default function Home() {
  const { pageInfo,characters, isloading, fetchCharacters } = ProfileApi()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchCharacters('',currentPage)
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
      default: // unknown or any other status
        return {
          bg: 'bg-gray-500',
          text: 'text-gray-400',
          shadow: 'shadow-[0_0_8px_rgba(156,163,175,1)]'
        }
    }
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1) // Reset to page 1 when searching
  }

  
  const handlePageClick = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    let endPage = Math.min(pageInfo.pages, startPage + maxPagesToShow - 1)

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }


  return (
    <div className="min-h-screen w-full bg-[url('/space.png')] bg-cover bg-center bg-no-repeat p-6">
      <div className='flex min-h-screen w-full flex-col items-center justify-start gap-10'>
        <Image src='/rick&mortytitle.png' alt='Logo' width={300} height={300} />
        <div className='w-full'>
          <SearchBox onSearch={handleSearch} />
        </div>
        <div className='flex h-full w-full items-center justify-center gap-4'>
          <hr className='flex-1 border-t-2 border-[#42b1cc]' />
          <h1 className='font-bold text-white'>List of Characters</h1>
          <hr className='flex-1 border-t-2 border-[#42b1cc]' />
        </div>

        {/* Loading State */}
        {isloading && (
          <div className='flex items-center justify-center py-20'>
            <Loader2 className='h-12 w-12 animate-spin text-[#42b1cc]' />
          </div>
        )}

        {/* Characters List */}
        {!isloading && characters && characters.length > 0 && (
          <div className='flex h-full w-full flex-col items-center justify-center gap-10'>
            {characters.map((character, index) => {
              const statusColors = getStatusColor(character.status)
              
              return (
                <Link
                  href={`/detail/${character.id}`}
                  key={character.id || index}
                  className='w-full md:w-1/2'
                >
                  <Card className='relative mt-10 w-full max-w-sm border-2 border-[#42b1cc] bg-gradient-to-br from-[#0d5759]/90 via-[#165c5f]/80 to-[#1a4d4f]/90 shadow-[0_0_20px_rgba(66,177,204,0.6),inset_0_0_60px_rgba(66,177,204,0.2),inset_0_0_100px_rgba(66,177,204,0.1)] backdrop-blur-sm'>
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
                      <CardTitle className='mt-2 text-center text-xl font-bold text-white'>
                        {character.name}
                      </CardTitle>
                      <CardDescription className='flex flex-col items-center justify-center gap-2 text-center text-sm'>
                        <span className="">{character.species}</span>

                        <div className='flex items-center justify-center gap-2'>
                          <span className={`h-2 w-2 rounded-full ${statusColors.bg} ${statusColors.shadow}`}></span>
                          <span className={statusColors.text}>{character.status}</span>
                        </div>
                        
                        
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='pb-6 text-center'>
                      <p className='text-sm text-gray-300'>
                        {character.origin?.name || 'Unknown'}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}

        {/* Simple Pagination */}
        {pageInfo.pages > 1 && (
          <Pagination className='pb-10'>
            <PaginationContent className='gap-4'>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
                  className={`cursor-pointer border-[#42b1cc] bg-black text-white hover:bg-[#42b1cc]/20 ${
                    currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                  }`}
                />
              </PaginationItem>

              <div className='flex items-center px-4 text-white'>
                <span className='text-sm font-medium'>
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
            <p>No characters found</p>
          </div>
        )}
      </div>
    </div>
  )
}