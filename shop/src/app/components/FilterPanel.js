// components/FilterPanel.js
'use client'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function FilterPanel({ currentCategory }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState({
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    rating: searchParams.get('rating') || ''
  })

  useEffect(() => {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    
    router.push(`${pathname}?${params.toString()}`)
  }, [filters])

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      rating: ''
    })
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md sticky top-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">فیلترها</h2>
        <button 
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          حذف همه
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Price Range Filter */}
        <div>
          <h3 className="font-medium mb-2">محدوده قیمت (تومان)</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm text-gray-500 mb-1">حداقل</label>
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">حداکثر</label>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h3 className="font-medium mb-2">حداقل امتیاز</h3>
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">همه</option>
            <option value="4">۴ ستاره به بالا</option>
            <option value="3">۳ ستاره به بالا</option>
          </select>
        </div>
      </div>
    </div>
  )
}