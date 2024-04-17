import Brand, { IBrand } from "../models/Brand";
import { Request, Response, NextFunction } from "express";

export const index = async (_req: Request, res: Response) => {
  const brands = await Brand.find({});
  if (brands) {
    res.status(200).json(brands);
  }
};

export const addBrand = async (req: Request, res: Response) => {
  const { name, logo } = req.body;
  if (name) {
    // check if name already exists
    const brandExists = await Brand.exists({ name: name });

    if (!brandExists) {
      const brandDetail: IBrand = { name };
      if (logo) {
        brandDetail.logo = logo;
      }
      const brand = new Brand(brandDetail);
      await brand.save();
      return res.status(200).json({ message: `Added brand: ${name}` });
    }

    return res
      .status(409)
      .json({ message: `Brand name ${name} already exists` });
  }
  res.status(400).json({ message: "name field cannot be empty" });
};

export const getBrand = (req: Request, res: Response) => {};

export const editBrand = (req: Request, res: Response) => {};

export const deleteBrand = () => {};
