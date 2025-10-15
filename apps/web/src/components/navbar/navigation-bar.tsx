'use client'
import { Users, MapPin } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
export default function NavigationBar() {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <header className='border-primary/20 bg-card/50 sticky top-0 z-50 backdrop-blur-sm'>
      <div className='container mx-auto px-4 '>
        <div className='flex items-center justify-center'>
          <Link href='/' className='group flex justify-center items-center'>
            <Image
              src='/rick&mortynavbar.png'
              alt='Logo'
              width={50}
              height={50}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden items-center gap-2 md:flex'>
            <Link
              href='/'
              className={`rounded-lg px-4 py-2 transition-all ${
                isActive('/')
                  ? 'text-primary-foreground shadow-portal bg-green-500'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Users className='mr-2 inline h-4 w-4' />
              Characters
            </Link>
            <Link
              href='/location'
              className={`rounded-lg px-4 py-2 transition-all ${
                isActive('/location')
                  ? 'bg-primary text-primary-foreground shadow-portal'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <MapPin className='mr-2 inline h-4 w-4' />
              Locations
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <nav className=' flex items-center gap-2 md:hidden'>
          <Link
            href='/'
            className={`flex-1 rounded-full px-4 py-2 text-center transition-all ${
              isActive('/')
                ? 'text-primary-foreground shadow-portal bg-[#bede3d]'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Users className='mr-1 inline h-4 w-4 text-white' />
            <span className='text-white'>Characters</span>
          </Link>
          <Link
            href='/location'
            className={`flex-1 rounded-full px-4 py-2 text-center transition-all ${
              isActive('/location')
                ? 'text-primary-foreground shadow-portal bg-[#bede3d]'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <MapPin className='mr-1 inline h-4 w-4 text-white' />
            <span className='text-white'>Locations</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
