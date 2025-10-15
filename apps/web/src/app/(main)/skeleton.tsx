import { Card, CardContent, CardHeader } from "@/components/shadcn-ui/card";

export default function CharacterPageSkeleton() {
  return (
    <div className='w-full'>
      <Card className='relative mt-10 h-full w-full animate-pulse border-2 border-[#42b1cc] bg-gradient-to-br from-[#0d5759]/90 via-[#165c5f]/80 to-[#1a4d4f]/90 shadow-[0_0_20px_rgba(66,177,204,0.6),inset_0_0_60px_rgba(66,177,204,0.2),inset_0_0_100px_rgba(66,177,204,0.1)] backdrop-blur-sm'>
        <CardHeader className='pb-4 pt-12'>
          <div className='absolute -top-10 left-1/2 -translate-x-1/2'>
            <div className='h-20 w-20 overflow-hidden rounded-full border-4 border-[#42b1cc] bg-gray-700 shadow-[0_0_15px_rgba(66,177,204,0.8)]' />
          </div>
          <div className='mt-2 flex flex-col items-center gap-3'>
            <div className='h-6 w-48 rounded bg-gray-700' />
            <div className='h-4 w-32 rounded bg-gray-700' />
            <div className='flex items-center gap-2'>
              <div className='h-2 w-2 rounded-full bg-gray-700' />
              <div className='h-4 w-16 rounded bg-gray-700' />
            </div>
          </div>
        </CardHeader>
        <CardContent className='pb-6 text-center'>
          <div className='mx-auto h-4 w-40 rounded bg-gray-700' />
        </CardContent>
      </Card>
    </div>
  )
}