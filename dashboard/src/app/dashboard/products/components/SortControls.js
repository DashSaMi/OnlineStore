'use client';
import { useRouter, useSearchParams } from 'next/navigation';

const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Newest' },
  { value: 'price', label: 'Price' },
  { value: 'name', label: 'Name' },
];

export default function SortControls() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') || 'createdAt';
  const order = searchParams.get('order') || 'desc';

  const handleChange = (e) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set(e.target.name, e.target.value);
    router.replace(`?${params.toString()}`);
  };

  return (
    <form className="mb-6 flex items-center gap-2" onSubmit={e => e.preventDefault()}>
      <label htmlFor="sort" className="text-sm text-gray-700">Sort by:</label>
      <select
        id="sort"
        name="sort"
        value={sort}
        className="border rounded px-2 py-1"
        onChange={handleChange}
      >
        {SORT_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <select
        id="order"
        name="order"
        value={order}
        className="border rounded px-2 py-1"
        onChange={handleChange}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </form>
  );
} 