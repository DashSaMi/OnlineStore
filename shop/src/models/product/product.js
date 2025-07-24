// models/product/Product.js
import { Schema, model, models } from 'mongoose';

const productSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'نام محصول الزامی است'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'قیمت محصول الزامی است'],
        min: [0, 'قیمت نمی‌تواند منفی باشد']
    },
    originalPrice: {
        type: Number,
        min: [0, 'قیمت اصلی نمی‌تواند منفی باشد']
    },
    discount: {
        type: Number,
        min: [0, 'تخفیف نمی‌تواند منفی باشد'],
        max: [100, 'تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد']
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, 'امتیاز نمی‌تواند منفی باشد'],
        max: [5, 'حداکثر امتیاز ۵ است']
    },
    reviews: {
        type: Number,
        default: 0,
        min: [0, 'تعداد نظرات نمی‌تواند منفی باشد']
    },
    imageUrl: {
        type: String,
        required: [true, 'تصویر محصول الزامی است']
    },
    description: {
        type: String,
        required: [true, 'توضیحات محصول الزامی است']
    },
    categories: {  // Changed from 'category' to 'categories' to match your query
        type: [String],
        required: [true, 'دسته‌بندی محصول الزامی است']
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'موجودی نمی‌تواند منفی باشد']
    },
    isBestSeller: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            ret.id = doc.id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

productSchema.pre('save', async function(next) {
    if (!this.id) {
        const highestProduct = await this.constructor.findOne().sort('-id');
        this.id = highestProduct ? highestProduct.id + 1 : 1;
    }
    next();
});

export default models.Product || model('Product', productSchema);