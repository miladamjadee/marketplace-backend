import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Vendor } from 'src/vendor/schemas/vendor.schema';

export type BankDocument = HydratedDocument<Bank>;

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
export class Bank {
  @Prop({ type: SchemaTypes.ObjectId, ref: Vendor.name, required: true })
  vendorId!: Types.ObjectId;

  @Prop({ type: Number, required: true })
  bankName: string;

  @Prop({ type: Number, required: true })
  accountNumber: number;

  @Prop({ type: String, required: true })
  accountHolderName: string;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const BankSchema = SchemaFactory.createForClass(Bank);
