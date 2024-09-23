import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';
import { User } from 'src/user/schemas/user.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
  id: true,
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id; // rename _id property to id
      delete ret._id; // delete the _id property off the object
      delete ret.__v; // delete useless property
    },
  },
})
export class Product {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: User.name,
    required: [true, 'یک محصول باید مالک داشته باشد'],
  })
  vendor!: Types.ObjectId;

  @Prop({
    type: String,
    trim: true,
    required: [true, 'یگ محصول باید یک عنوان داشته باشد'],
    maxlength: [77, 'یک عنوان محصول باید از ۷۷ کاراکتر کمتر یا مساوی باشد'],
    minlength: [7, 'یک عنوان محصول باید بیش از ۷ کاراکتر داشته باشد'],
  })
  title!: string;
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Category.name,
    required: [true, 'یک محصول باید یک دسته بندی داشته باشد'],
  })
  category: Types.ObjectId;

  @Prop({ type: String, trim: true })
  subtitle?: string;

  @Prop({
    type: String,
    required: [true, 'وضعیت ظاهری یک محصول باید مشخص باشد'],
    enum: {
      values: [
        'جدید',
        'استفاده شده - در حد نو',
        'دست دوم - خوب',
        'دست دوم - در حد خوب',
      ],
      message: [
        'جدید، استفاده شده - در حد نو، دست دوم - خوب، دست دوم - در حد خوب',
      ],
    },
  })
  condition!: string;

  @Prop({ type: Number, required: [true, 'یک محصول باید یک قیمت داشته باشد'] })
  price!: number;

  @Prop({
    type: String,
    maxlength: [2000, 'توضیحات محصول باید از ۲۰۰۰ کاراکتر کمتر یا مساوی باشد'],
    minlength: [4, 'توضیحات محصول باید بیش از ۴ کاراکتر داشته باشد'],
  })
  description?: string;

  @Prop({
    type: String,
    required: [true, 'وضعیت ظاهری یک محصول باید مشخص باشد'],
    enum: ['فقط یکی', 'موجود در انبار'],
  })
  stockQuantity!: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
