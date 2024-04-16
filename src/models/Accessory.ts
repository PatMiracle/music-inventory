import { Schema, Types, model } from "mongoose";
import Instrument, { InstrumentI } from "./Instrument";
import { IBrand } from "./Brand";

export interface AccessoryI {
  name: string;
  description?: string;
  img: string;
  related_instruments?: Types.ObjectId[] | InstrumentI[];
  brand?: Types.ObjectId | IBrand;
  features?: string[];
  price: number;
  stock: number;
}

const AccessorySchema = new Schema<AccessoryI>({
  name: { type: String, maxLength: 20, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  related_instruments: [{ type: Schema.Types.ObjectId, ref: "Instrument" }],
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  features: [String],
  price: { type: Number, required: true, max: 1000 },
  stock: { type: Number, required: true },
});

export default model<AccessoryI>("Accessory", AccessorySchema);
