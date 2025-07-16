'use client';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/lib/api/products';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define validation schema
const productSchema = z.object({
  name: z.string().min(3, 'نام محصول باید حداقل 3 کاراکتر باشد'),
  price: z.number().min(1000, 'قیمت باید حداقل 1000 ریال باشد'),
  description: z.string().min(10, 'توضیحات باید حداقل 10 کاراکتر باشد'),
  categories: z.string().min(2, 'حداقل یک دسته‌بندی وارد کنید'),
  stock: z.number().min(0, 'موجودی نمی‌تواند منفی باشد'),
  imageUrl: z.string().url('آدرس تصویر معتبر نیست')
});

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError
  } = useForm({
    resolver: zodResolver(productSchema)
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError(null);
    
    try {
      const productData = {
        ...data,
        categories: data.categories.split(',').map(c => c.trim()),
        price: Number(data.price),
        stock: Number(data.stock)
      };

      const result = await createProduct(productData);
      
      if (result.success) {
        router.push('/dashboard/products');
        router.refresh();
      } else {
        setServerError(result.error || 'خطا در ثبت محصول');
      }
    } catch (err) {
      console.error('Error creating product:', err);
      setServerError(err.message || 'خطا در ارتباط با سرور');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">افزودن محصول جدید</h1>
      
      {/* Error messages */}
      {serverError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نام محصول*</label>
            <input
              type="text"
              {...register('name')}
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          
          {/* Price Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">قیمت (ریال)*</label>
            <input
              type="number"
              {...register('price', { valueAsNumber: true })}
              min="1000"
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>
          
          {/* Categories Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">دسته‌بندی‌ها (با کاما جدا کنید)*</label>
            <input
              type="text"
              {...register('categories')}
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.categories ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
              placeholder="الکترونیک, لوازم خانگی"
            />
            {errors.categories && (
              <p className="mt-1 text-sm text-red-600">{errors.categories.message}</p>
            )}
          </div>
          
          {/* Stock Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">موجودی*</label>
            <input
              type="number"
              {...register('stock', { valueAsNumber: true })}
              min="0"
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.stock ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.stock && (
              <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
            )}
          </div>
          
          {/* Description Field */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات*</label>
            <textarea
              {...register('description')}
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              rows="4"
              disabled={isSubmitting}
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>
          
          {/* Image URL Field */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">آدرس تصویر*</label>
            <input
              type="url"
              {...register('imageUrl')}
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.imageUrl ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">لطفا آدرس کامل تصویر را وارد کنید</p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/dashboard/products')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            disabled={isSubmitting}
          >
            انصراف
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                در حال ذخیره...
              </span>
            ) : 'ذخیره محصول'}
          </button>
        </div>
      </form>
    </div>
  );
}