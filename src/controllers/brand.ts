import Brand, { IBrand } from "../models/Brand";
import { Request, Response, NextFunction } from "express";

export const index = async (_req: Request, res: Response) => {
  const brands = await Brand.find({});
  if (Object.keys(brands).length) {
    res.status(200).json(brands);
  } else res.status(404).json({ message: "no brands created" });
};

export const addBrand = async (req: Request, res: Response) => {
  const { name, logo } = req.body;
  if (name) {
    // check if name already exists
    const brandExists = await Brand.exists({ name: name.toLowercase() });

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

export const getBrand = async (req: Request, res: Response) => {
  const { brandName } = req.params;
  if (brandName) {
    const brand = await Brand.find({ name: brandName.toLowerCase() });

    if (Object.keys(brand).length) {
      return res.status(200).json(brand);
    } else {
      return res
        .status(404)
        .json({ message: `Brand name ${brandName} does not exist` });
    }
  }
  res.status(400).json({ message: "name field cannot be empty" });
};

export const editBrand = (req: Request, res: Response) => {};

export const deleteBrand = () => {};
