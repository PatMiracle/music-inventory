import { Schema, Model } from "mongoose";

interface IBrand{
    name: string
    logo?: string
}

const BrandSchema = new Schema<IBrand>({
  name: { type: String, required: true, unique: true },
  logo: { type: String },
});

const Brand = Model.create("Brand", BrandSchema);

export default Brand