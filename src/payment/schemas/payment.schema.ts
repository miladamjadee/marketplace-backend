import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Order } from 'src/order/schemas/order.schema';
import { Transaction } from 'src/transaction/schemas/transaction.schema';
import { User } from 'src/user/schemas/user.schema';

export type PaymentDocument = HydratedDocument<Payment>;

export enum PaymentStatus {
  SUCCESS = 'Success',
  PENDING = 'Pending',
  FAILED = 'Failed',
}

export enum PaymentMethod {
  ONLINE = 'Online',
  COD = 'Cod',
  GIFT = 'Gift',
}
export enum PaymentGateway {
  ZARINPAL = 'Zarinpal',
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
export class Payment {
  @Prop({ type: SchemaTypes.ObjectId, ref: Order.name, required: true })
  // شناسه سفارش مرتبط با این پرداخت
  orderId!: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  // شناسه کاربر که پرداخت را انجام داده
  paymentBy!: Types.ObjectId;

  @Prop({ type: Number, required: true })
  // مبلغ کل پرداخت
  amount!: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: Transaction.name, required: true })
  // شناسه تراکنش در درگاه پرداخت یا سیستم مالی
  transactionId: Types.ObjectId;

  @Prop({ type: String, required: true })
  reserve!: string;

  @Prop({ type: String, default: 'USD' })
  // واحد پول (اختیاری)
  currency: string;

  @Prop({
    type: String,
    enum: ['Online', 'Cod', 'Gift'],
    default: PaymentMethod.ONLINE,
  })
  // روش پرداخت
  paymentMethod!: string;

  @Prop({
    type: String,
    enum: ['Zarinpal'],
    default: PaymentGateway.ZARINPAL,
  })
  // نام درگاه پرداخت (اختیاری)
  paymentGateway: string;

  @Prop({
    type: String,
    enum: ['Success', 'Pending', 'Failed'],
    default: PaymentStatus.PENDING,
  })
  // وضعیت پرداخت
  paymentStatus!: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

// TODO: توضیحات فیلدها:

// 	1.	orderId: شناسه سفارش مرتبط با پرداخت.
// 	2.	userId: شناسه کاربری که پرداخت را انجام داده (معمولاً مشتری).
// 	3.	amount: مبلغ کل پرداخت.
// 	4.	currency: واحد پول (در صورت نیاز).
// 	5.	paymentMethod: روش پرداخت (مثلاً کارت اعتباری، PayPal، انتقال بانکی).
// 	6.	transactionId: شناسه تراکنش در سیستم مالی یا درگاه پرداخت (مثلاً Stripe، PayPal).
// 	7.	paymentStatus: وضعیت پرداخت، که می‌تواند یکی از این موارد باشد:
// 	•	pending: پرداخت در انتظار تایید است.
// 	•	completed: پرداخت با موفقیت انجام شده است.
// 	•	failed: پرداخت شکست خورده است.
// 	8.	paymentGateway: نام درگاه پرداخت (در صورت نیاز، برای مشخص کردن سیستمی که پرداخت از طریق آن انجام شده است).
// 	9.	createdAt و updatedAt: زمان ایجاد و آخرین به‌روزرسانی پرداخت.
