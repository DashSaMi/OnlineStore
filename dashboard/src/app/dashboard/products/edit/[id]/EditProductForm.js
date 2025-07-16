'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateProduct } from '@/lib/api/products';

export default function EditProductForm({ product }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    _id: product._id, // keep _id for update
    name: product.name || '',
    price: product.price || '',
    description: product.description || '',
    categories: (product.categories || []).join(', '),
    stock: product.stock || 0,
    imageUrl: product.imageUrl || '',
    isBestSeller: product.isBestSeller || false,
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const updatedProduct = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        categories: formData.categories
          .split(',')
          .map((c) => c.trim())
          .filter(Boolean),
      };

      await updateProduct(updatedProduct);

      router.push('/dashboard/products');
      router.refresh();
    } catch (err) {
      setError(err.message || 'خطا در بروزرسانی محصول');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-semibold text-gray-800">ویرایش محصول</h1>

      {error && (
        <p className="text-red-600 bg-red-100 p-3 rounded border border-red-400">
          {error}
        </p>
      )}

      {/* Hidden input for _id */}
      <input type="hidden" name="_id" value={formData._id} />

      <div>
        <label
          htmlFor="name"
          className="block mb-1 text-gray-700 font-medium"
        >
          نام محصول
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          disabled={isSubmitting}
          required
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block mb-1 text-gray-700 font-medium"
        >
          قیمت
        </label>
        <input
          id="price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          disabled={isSubmitting}
          required
        />
      </div>

      <div>
        <label
          htmlFor="categories"
          className="block mb-1 text-gray-700 font-medium"
        >
          دسته‌بندی‌ها
        </label>
        <input
          id="categories"
          type="text"
          name="categories"
          value={formData.categories}
          onChange={handleChange}
          placeholder="مثلاً: الکترونیک, کامپیوتر"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          disabled={isSubmitting}
          required
        />
      </div>

      <div>
        <label
          htmlFor="stock"
          className="block mb-1 text-gray-700 font-medium"
        >
          موجودی
        </label>
        <input
          id="stock"
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          min="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          disabled={isSubmitting}
          required
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block mb-1 text-gray-700 font-medium"
        >
          توضیحات
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 resize-none"
          disabled={isSubmitting}
          required
        />
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block mb-1 text-gray-700 font-medium"
        >
          آدرس تصویر
        </label>
        <input
          id="imageUrl"
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isBestSeller"
          checked={formData.isBestSeller}
          onChange={handleChange}
          disabled={isSubmitting}
          id="isBestSeller"
          className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        <label
          htmlFor="isBestSeller"
          className="text-gray-700 select-none"
        >
          Mark as Best Seller
        </label>
      </div>

      {formData.imageUrl && (
        <img
          src={formData.imageUrl}
          alt="Preview"
          className="h-48 w-48 object-contain border rounded mx-auto"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder-product.jpg';
          }}
        />
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-md transition-colors"
      >
        {isSubmitting ? 'در حال بروزرسانی...' : 'ذخیره تغییرات'}
      </button>
    </form>
  );
}
