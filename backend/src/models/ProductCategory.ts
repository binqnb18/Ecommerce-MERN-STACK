import mongoose, { Schema, Document } from 'mongoose';

export interface IProductCategory extends Document {
  title: string;
  parent_id?: mongoose.Types.ObjectId;
  description?: string;
  thumbnail?: string;
  status: 'active' | 'inactive';
  position?: number;
  slug: string;
  deleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProductCategorySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    parent_id: { type: Schema.Types.ObjectId, ref: 'ProductCategory', default: null },
    description: { type: String },
    thumbnail: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    position: { type: Number, min: 0 },
    slug: { type: String, slug: 'title', unique: true },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
    collection: 'products-category',
  }
);

export default mongoose.model<IProductCategory>('ProductCategory', ProductCategorySchema);