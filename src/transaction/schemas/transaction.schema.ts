import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Payment } from 'src/payment/schemas/payment.schema';
import { Vendor } from 'src/vendor/schemas/vendor.schema';

interface IDetails {
  readonly accountNumber: number;
  readonly bankName: string;
  readonly transactionId: string;
}

export type TransactionDocument = HydratedDocument<Transaction>;

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
export class Transaction {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Payment', required: true })
  // شناسه پرداخت مرتبط
  paymentId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Vendor.name, required: true })
  // شناسه فروشنده‌ای که از تراکنش بهره‌مند می‌شود
  vendorId!: Types.ObjectId;

  @Prop({ type: Number, required: true })
  // مبلغ تعلق‌گرفته به فروشنده
  amount: number;

  @Prop({ type: Number, required: true })
  // کمیسیون سیستم (اختیاری)
  commission: number;

  @Prop({ type: String, default: 'USD' })
  // واحد پول
  currency: string;

  @Prop({ type: String })
  // وضعیت تراکنش (pending, completed, failed)
  transactionStatus: string;

  @Prop({ type: String })
  // نوع تراکنش (sale, refund, commission)
  transactionType: string;

  // تاریخ تراکنش
  @Prop({ default: Date.now })
  transactionDate: Date;

  @Prop(
    raw({
      accountNumber: { type: Number },
      bankName: { type: String },
      transactionId: { type: String },
    }),
  )
  details: Record<string, Required<IDetails>>;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

// 1.	paymentId: شناسه پرداختی که تراکنش مربوط به آن است.
// 	2.	vendorId: شناسه فروشنده‌ای که باید مبلغ تراکنش را دریافت کند.
// 	3.	amount: مبلغی که به فروشنده تعلق می‌گیرد.
// 	4.	commission: کمیسیون سامانه که از مبلغ کل پرداخت کسر می‌شود (اختیاری).
// 	5.	currency: واحد پول مورد استفاده.
// 	6.	transactionStatus: وضعیت تراکنش که شامل موارد زیر می‌شود:
// 	•	pending: تراکنش در حال پردازش است.
// 	•	completed: تراکنش با موفقیت انجام شده است.
// 	•	failed: تراکنش ناموفق بوده است.
// 	7.	transactionType: نوع تراکنش که می‌تواند یکی از موارد زیر باشد:
// 	•	sale: تراکنش فروش محصول.
// 	•	refund: بازگشت وجه.
// 	•	commission: تراکنش مربوط به کمیسیون سیستم.
// 	8.	transactionDate: تاریخ و زمان انجام تراکنش.
// 	9.	details: جزئیات مربوط به انتقال وجه، مثل شماره حساب بانکی، نام بانک، و شناسه تراکنش در بانک.
