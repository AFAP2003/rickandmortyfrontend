import { useState } from "react"

interface SearchBoxProps {
  onSearch: (value: string) => void
  defaultValue?: string
}
export default function SearchBox({onSearch, defaultValue = ''}: SearchBoxProps) {
   const [searchValue, setSearchValue] = useState(defaultValue)

   
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    onSearch(value)
  }
  return (
    <div className='h-[50px] w-full rounded-full'>
      <input
        type='text'
        placeholder='Look for characters...'
        value={searchValue}
        onChange={handleChange}
        className='w-full rounded-full border-2 border-[#42b1cc] bg-black text-white placeholder:text-[#42b1cc] focus:border-white'
      />
    </div>
  )
}
