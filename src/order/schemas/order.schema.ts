import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { User } from 'src/user/schemas/user.schema';

@Schema()
export class Products {
  @Prop({ type: SchemaTypes.ObjectId, ref: Product.name, required: true })
  product: Types.ObjectId;

  @Prop({ type: Number, default: 0, required: true })
  quantity!: number;

  @Prop({ type: Number, default: 0, required: true })
  price!: number;
}

const ProductsSchema = SchemaFactory.createForClass(Products);

export type OrderDocument = HydratedDocument<Order>;

export enum OrderStatus {
  NOTPROCESSED = 'Not Processed',
  PAID = 'Paid',
  CONFIRMED = 'Confirmed',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
  REFUNDED = 'Refunded',
}

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
export class Order {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  orderedBy!: Types.ObjectId;

  @Prop({ type: Number, required: true })
  totalPrice!: number;

  @Prop({ type: [ProductsSchema] })
  products!: Products[];

  @Prop({ type: String, trim: true, lowercase: true })
  deliveryAddress!: string;

  @Prop({
    type: String,
    enum: [
      'Not Processed',
      'Paid',
      'Confirmed',
      'Processing',
      'Shipped',
      'Delivered',
      'Cancelled',
      'Refunded',
    ],
    default: OrderStatus.NOTPROCESSED,
  })
  status: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
