import { Schema, model } from "mongoose";

export interface ICategory {
  name: string;
  description: string;
  cover_img: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, maxLength: 20, required: true, unique: true },
  description: { type: String, required: true, minLength: 20 },
  cover_img: { type: String, required: true, unique: true },
});

export default model<ICategory>("Category", CategorySchema);
