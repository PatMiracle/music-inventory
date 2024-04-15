import { Schema, Model, SchemaTypes, Types } from "mongoose";
import Instrument, {InstrumentI} from "./Instrument";

interface AccessoryI{
    name: string
    description?: string
    img: string
    related_instruments?: InstrumentI[]
    brand?: Types.ObjectId
    features?: string[]
    price: number
    stock: number
}

const AccessorySchema = new Schema<AccessoryI>({
  name: { type: String, maxLength: 20, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  related_instruments: [Instrument],
  brand: { type: SchemaTypes.ObjectId, ref: "Brand" },
  features: [String],
  price: { type: Number, required: true, max: 1000 },
  stock: { type: Number, required: true },
});

export default Model.create("Accessory", AccessorySchema);
