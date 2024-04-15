import { Schema, Model, SchemaTypes, Types } from "mongoose";

export interface InstrumentI{
    name: string
    description?: string
    img: string
    category: Types.ObjectId
    brand?: Types.ObjectId
    features? : string[]
    price: number
    stock: number
}

const InstrumentSchema = new Schema<InstrumentI>({
  name: { type: String, maxLength: 20, required: true },
  description: { type: String },
  img: { type: String, required: true },
  category: {
    type: SchemaTypes.ObjectId,
    ref: "Category",
    lowercase: true,
    required: true,
  },
  brand: { type: SchemaTypes.ObjectId, ref: "Brand" },
  features:[String],
  price: { type: Number, required: true, max: 1000 },
  stock: { type: Number, required: true },
});

export default Model.create("Instrument", InstrumentSchema);
