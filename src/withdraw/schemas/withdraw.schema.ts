import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Vendor } from 'src/vendor/schemas/vendor.schema';

export enum WithdrawStatus {
  SUCCESS = 'Success',
  PENDING = 'pending',
  FAILED = 'Failed',
}
interface IDetails {
  readonly bankName: string;
  readonly accountNumber: number;
  readonly accountHolderName: string;
}
@Schema()
export class StatusHistory {
  @Prop({
    type: String,
    enum: ['Success', 'Pending', 'Failed'],
    default: WithdrawStatus.PENDING,
  })
  status: string;

  @Prop({ type: Date, default: Date.now })
  changedAt: Date;
}

const StatusHistorySchema = SchemaFactory.createForClass(StatusHistory);

export class PaymentMethod {
  @Prop({
    type: String,
    enum: ['Success', 'Pending', 'Failed'],
    default: WithdrawStatus.PENDING,
  })
  // نوع پرداخت
  type: string;

  @Prop(
    raw({
      bankName: { type: Number },
      accountNumber: { type: String },
      accountHolderName: { type: String },
    }),
  )
  details: Record<string, Required<IDetails>>;
}

const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);

export type WithdrawDocument = HydratedDocument<Withdraw>;

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
export class Withdraw {
  @Prop({ type: SchemaTypes.ObjectId, ref: Vendor.name, required: true })
  // شناسه فروشنده که درخواست برداشت کرده
  vendorId!: Types.ObjectId;

  @Prop({ type: Number, required: true })
  // مبلغ درخواست‌ شده برای برداشت
  amount: number;

  @Prop({ type: String, default: 'USD', required: true })
  // واحد پول (اختیاری، بر اساس نیاز سیستم)
  currency: string;

  @Prop({
    type: String,
    enum: ['Success', 'Pending', 'Failed'],
    default: WithdrawStatus.PENDING,
  })
  status: string;

  @Prop({ type: [StatusHistorySchema] })
  // ثبت تاریخچه
  statusHistory: StatusHistory[];

  @Prop({ type: PaymentMethodSchema })
  paymentMethod: PaymentMethod;

  @Prop({ default: Date.now })
  // تاریخ درخواست برداشت
  requestedAt!: Date;

  @Prop({ default: null })
  // تاریخ پردازش (در ابتدا null است، بعد از پرداخت پر می‌شود)
  processedAt!: Date;

  @Prop({ default: null })
  // در صورت عدم موفقیت پرداخت، علت اینجا ذکر می‌شود
  failedReason: string;
}

export const WithdrawSchema = SchemaFactory.createForClass(Withdraw);

// TODO: توضیحات فیلدها:

// 	1.	_id: شناسه یکتا برای هر درخواست برداشت.
// 	2.	vendorId: شناسه فروشنده‌ای که درخواست برداشت داده است. این فیلد به سند Vendor مرتبط است.
// 	3.	amount: مبلغ درخواستی برای برداشت.
// 	4.	currency: واحد پول مورد استفاده (مثلاً USD, EUR, IRR). اگر سامانه شما چند ارزی باشد، این فیلد می‌تواند مفید باشد.
// 	5.	status: وضعیت برداشت. شامل موارد زیر است:
// 	•	pending: درخواست برداشت در حال بررسی است.
// 	•	completed: درخواست برداشت پردازش و پرداخت شده است.
// 	•	failed: درخواست برداشت ناموفق بوده است.
// 	6.	paymentMethod: اطلاعات روش پرداخت که فروشنده برای دریافت پول انتخاب کرده است. این فیلد به صورت یک شیء (object) ذخیره می‌شود و شامل موارد زیر است:
// 	•	type: نوع روش پرداخت. مثال‌ها شامل bank_transfer, paypal, یا دیگر روش‌های پرداخت هستند.
// 	•	details: اطلاعات مرتبط با روش پرداخت انتخابی. برای مثال، اگر نوع پرداخت انتقال بانکی باشد، اطلاعاتی نظیر نام بانک، شماره حساب، نام صاحب حساب، IBAN، و SWIFT درج می‌شود. برای روش‌های دیگر، اطلاعات مربوط به آنها باید ذخیره شود.
// 	7.	requestedAt: تاریخ و زمان درخواست برداشت.
// 	8.	processedAt: تاریخ و زمان پردازش برداشت. زمانی که برداشت تکمیل می‌شود، این فیلد پر می‌شود.
// 	9.	failedReason: اگر برداشت ناموفق باشد، دلیل شکست در این فیلد ذخیره می‌شود (مثلاً “اطلاعات بانکی نامعتبر”).
