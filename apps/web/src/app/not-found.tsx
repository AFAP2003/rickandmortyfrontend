
import Image from 'next/image'
export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[url('https://res.cloudinary.com/dpjh6i5qm/image/upload/v1760512755/space_vm6wx7.png')] text-center">
      <Image
        src='https://res.cloudinary.com/dpjh6i5qm/image/upload/v1760513299/rick_mortynotfoundhome_zx6stc.png'
        alt='Not Found'
        width={300}
        height={300}
      />
      <h1 className='mb-2 text-4xl font-bold text-white'>
        404 - Page Not Found
      </h1>
      <p className='mb-4'>The page you’re looking for doesn’t exist.</p>
      <a href='/' className='rounded bg-[#bede3d] px-4 py-2 text-white'>
        Go Back Home
      </a>
    </div>
  )
}
