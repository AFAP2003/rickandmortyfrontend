import { Card } from '@/components/shadcn-ui/card'

export default function LocationPageSkeleton() {
  return (
    <Card className='animate-pulse overflow-hidden border-2 border-black bg-black'>
      <div className='flex gap-4 p-4'>
        <div className='h-20 w-20 rounded-[10px] bg-gray-700' />
        <div className='min-w-0 flex-1 space-y-2'>
          <div className='h-5 w-3/4 rounded bg-gray-700' />
          <div className='h-4 w-1/2 rounded bg-gray-700' />
          <div className='flex items-center gap-2'>
            <div className='h-2 w-2 rounded-full bg-gray-700' />
            <div className='h-4 w-16 rounded bg-gray-700' />
          </div>
        </div>
      </div>
    </Card>
  )
}
