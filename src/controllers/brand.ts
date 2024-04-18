import Brand, { IBrand } from "../models/Brand";
import { Request, Response } from "express";

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
      .json({ message: `Brand name ${name.toLowerCase()} already exists` });
  }
  res.status(400).json({ message: "name field cannot be empty" });
};

export const getBrand = async (req: Request, res: Response) => {
  const { brandName } = req.params;

  const brand = await Brand.find({ name: brandName });

  if (Object.keys(brand).length) {
    return res.status(200).json(brand);
  } else {
    return res
      .status(404)
      .json({ message: `Brand name ${brandName} does not exist` });
  }
};

export const editBrand = async (req: Request, res: Response) => {
  const { brandName } = req.params;
  const { name, logo } = req.body;

  if (!name && !logo) {
    return res.status(400).json({ message: `no specified field to update` });
  }

  const brandExists = await Brand.exists({ name: brandName });

  if (brandExists) {
    const updateBrand: { name?: string; logo?: string } = {};

    if (name) {
      updateBrand.name = name;
    }
    if (logo) {
      updateBrand.logo = logo;
    }

    await Brand.findOneAndUpdate({ name: brandName }, updateBrand)
      .then(() => {
        res.status(200).send({ message: "update success" });
      })
      .catch((e) => res.status(500).send({ message: "update unsuccessful" }));
  } else {
    res.status(404).json({ message: `Brand name ${brandName} does not exist` });
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  const { brandName } = req.params;

  await Brand.deleteOne({ name: brandName })
    .then(() => {
      res.status(200).send({ message: "delete success" });
    })
    .catch((e) => {
      res.status(500).send("there was an error");
    });
};
