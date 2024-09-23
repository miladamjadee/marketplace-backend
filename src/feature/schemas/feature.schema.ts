import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';

export type FeatureDocument = HydratedDocument<Feature>;

export enum InputType {
  TEXT = 'Text',
  BOOLEAN = 'Boolean',
  DROPDOWN = 'Dropdown',
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
export class Feature {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category', required: true })
  category!: Types.ObjectId;

  @Prop({ type: String, required: true })
  featureName!: string;

  @Prop({ type: String, required: true })
  displayName!: string;

  @Prop({
    type: String,
    enum: ['Text', 'Dropdown', 'Boolean'],
    required: true,
  })
  inputType!: string;

  @Prop({ type: String })
  options?: string[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);
