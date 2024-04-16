import { Schema, model, Types } from "mongoose";
import { ICategory } from "./Category";
import { IBrand } from "./Brand";

export interface InstrumentI {
  name: string;
  description?: string;
  img: string;
  category: Types.ObjectId | ICategory;
  brand?: Types.ObjectId | IBrand;
  features?: string[];
  price: number;
  stock: number;
}

const InstrumentSchema = new Schema<InstrumentI>({
  name: { type: String, maxLength: 20, required: true },
  description: { type: String },
  img: { type: String, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    lowercase: true,
    required: true,
  },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  features: [String],
  price: { type: Number, required: true, max: 1000 },
  stock: { type: Number, required: true },
});

export default model<InstrumentI>("Instrument", InstrumentSchema);
