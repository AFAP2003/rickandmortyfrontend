export default function SearchBox() {
  return (
    <div className='h-[50px] w-full rounded-full'>
      <input
        type='text'
        placeholder='Look for characters...'
        className='w-full rounded-full border-2 border-[#42b1cc] bg-black text-white placeholder:text-[#42b1cc] focus:border-white'
      />
    </div>
  )
}
