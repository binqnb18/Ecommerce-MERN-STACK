import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  slug: string;
  product_category_id?: mongoose.Types.ObjectId;
  price: number;
  discountPercentage: number;
  stock: number;
  thumbnail: string;
  description: string;
  status: 'active' | 'inactive';
  position: number;
  deleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, slug: 'title', unique: true },
    product_category_id: { type: Schema.Types.ObjectId, ref: 'ProductCategory', default: null },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    stock: { type: Number, required: true, min: 0 },
    thumbnail: { type: String, required: true },
    description: { type: String, default: '' },
    status: { type: String, enum: ['active', 'inactive'], required: true },
    position: { type: Number, required: true, min: 0 },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
    collection: 'products',
  }
);

export default mongoose.model<IProduct>('Product', ProductSchema);