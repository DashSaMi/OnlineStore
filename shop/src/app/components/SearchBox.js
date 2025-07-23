// components/SearchBox.js
'use client'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

export default function SearchBox({ currentCategory }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    
    if (debouncedSearchTerm) {
      params.set('search', debouncedSearchTerm)
    } else {
      params.delete('search')
    }
    
    router.push(`${pathname}?${params.toString()}`)
  }, [debouncedSearchTerm])

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="جستجوی محصولات..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      )}
    </div>
  )
}