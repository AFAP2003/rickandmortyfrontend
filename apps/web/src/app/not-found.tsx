// app/not-found.tsx
import Image from "next/image"
export default function NotFound() {
  return (
    <div className="bg-[url('/space.png')] flex flex-col items-center justify-center h-screen text-center">
      <Image src="/rick&mortynotfoundhome.png" alt="Not Found" width={300} height={300} />
      <h1 className="text-4xl font-bold mb-2 text-white">404 - Page Not Found</h1>
      <p className=" mb-4">
        The page you’re looking for doesn’t exist.
      </p>
      <a
        href="/"
        className="px-4 py-2 bg-[#bede3d] text-white rounded "
      >
        Go Back Home
      </a>
    </div>
  )
}
