import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Feature } from 'src/feature/schemas/feature.schema';

export type CategoryDocument = HydratedDocument<Category>;

interface IAvatar {
  url: string;
  bgPosition: string;
  bgSize: string;
  width: string;
  height: string;
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
export class Category {
  @Prop({ type: String, trim: true, unique: true })
  categoryName: string;

  @Prop({ type: String, trim: true, index: true, unique: true })
  displayName: string;

  @Prop(
    raw({
      url: { type: String },
      bgPosition: { type: String },
      bgSize: { type: String },
      width: { type: String },
      height: { type: String },
    }),
  )
  avatar?: Record<string, IAvatar>;

  @Prop({ type: String })
  path: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Category.name, default: null })
  parent?: Types.ObjectId;

  @Prop([
    {
      type: SchemaTypes.ObjectId,
      ref: Category.name,
      default: [],
      index: true,
    },
  ])
  ancestors?: Types.ObjectId[];

  @Prop([
    {
      type: SchemaTypes.ObjectId,
      ref: Feature.name,
      default: [],
    },
  ])
  features?: Types.ObjectId[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
