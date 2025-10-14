'use client'
import { Users, MapPin } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationBar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <header className=" border-primary/20 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-portal animate-portal-spin" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Rick & Morty
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg transition-all ${
                isActive('/') 
                  ? 'bg-green-500 text-primary-foreground shadow-portal' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Characters
            </Link>
            <Link
              href="/location"
              className={`px-4 py-2 rounded-lg transition-all ${
                isActive('/location') 
                  ? 'bg-primary text-primary-foreground shadow-portal' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <MapPin className="w-4 h-4 inline mr-2" />
              Locations
            </Link>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-2 mt-4">
          <Link
            href="/"
            className={`flex-1 px-4 py-2 rounded-full transition-all text-center ${
              isActive('/') 
                ? 'bg-[#bede3d] text-primary-foreground shadow-portal' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Users className="w-4 h-4 inline mr-1 text-white" />
            <span className='text-white'>Characters</span>
          </Link>
          <Link
            href="/location"
            className={`flex-1 px-4 py-2 rounded-full transition-all text-center ${
              isActive('/location') 
                ? 'bg-[#bede3d] text-primary-foreground shadow-portal' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <MapPin className="w-4 h-4 inline mr-1 text-white" />
            <span className='text-white'>Locations</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}