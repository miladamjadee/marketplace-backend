import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Product } from '../../product/schemas/product.schema';
import { User } from '../../user/schemas/user.schema';

@Schema()
export class Products {
  @Prop({ type: SchemaTypes.ObjectId, ref: Product.name, required: true })
  product: Types.ObjectId;

  @Prop({ type: Number, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Number, required: true })
  totalPrice: number;
}

const ProductsSchema = SchemaFactory.createForClass(Products);

export type CartDocument = HydratedDocument<Cart>;

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
export class Cart {
  @Prop({ type: [ProductsSchema] })
  products!: Products[];

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  customer!: Types.ObjectId;

  @Prop({ type: Number, required: true })
  totalAmount: number;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
