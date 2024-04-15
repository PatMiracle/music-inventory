import { Schema, model } from "mongoose";

interface IBrand{
    name: string
    logo?: string
}

const BrandSchema = new Schema<IBrand>({
  name: { type: String, required: true, unique: true },
  logo: { type: String },
});

const Brand = model<IBrand>("Brand", BrandSchema);

export default Brand