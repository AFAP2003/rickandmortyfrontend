import { Loader2 } from 'lucide-react'

interface LoadingOverlayProps {
  isLoading: boolean
}

export default function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  if (!isLoading) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm'>
      <div className='flex flex-col items-center gap-4'>
        <Loader2 className='h-16 w-16 animate-spin text-[#42b1cc]' />
      </div>
    </div>
  )
}