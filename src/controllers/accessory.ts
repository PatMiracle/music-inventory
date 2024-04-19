import Accessory, { AccessoryI } from "../models/Accessory";
import { Request, Response } from "express";

export const index = async (_req: Request, res: Response) => {
  const accessories = await Accessory.find({});
  if (Object.keys(accessories).length) {
    res.status(200).json(accessories);
  } else res.status(404).json({ message: "no accessories created" });
};

export const addAccessory = async (req: Request, res: Response) => {
  const {
    name,
    description,
    img,
    related_instruments,
    brand,
    features,
    price,
    stock,
  } = req.body;

  if (!name || !img || !price || !stock) {
    return res.status(400).json({
      message: "fields: name, img, price and stock must not be empty",
    });
  }

  if (price > 1000) {
    return res
      .status(400)
      .json({ message: "price should be less than or 1000" });
  }
  const accessoryDetail: AccessoryI = { name, img, price, stock };

  if (description) accessoryDetail.description = description;
  if (related_instruments)
    accessoryDetail.related_instruments = related_instruments;
  if (brand) accessoryDetail.brand = brand;
  if (features) accessoryDetail.features = features;

  return res.status(201).json({ message: `Added instrument: ${name}` });
};

export const getAccessory = async (req: Request, res: Response) => {};

export const editAccessory = async (req: Request, res: Response) => {};

export const deleteAccessory = async (req: Request, res: Response) => {};
