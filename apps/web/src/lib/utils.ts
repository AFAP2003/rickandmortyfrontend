import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStatusColor = (status: string) => {
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
