import { isValidObjectId } from "mongoose";
import Accessory, { AccessoryI } from "../models/Accessory";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const index = async (_req: Request, res: Response) => {
  const accessories = await Accessory.find({});
  if (Object.keys(accessories).length) {
    res.status(200).json(accessories);
  } else res.status(404).json({ message: "no accessories created" });
};

export const addAccessory = [
  body("name").trim().notEmpty().withMessage("name field cannot be empty"),
  body("img").notEmpty().withMessage("img field cannot be empty"),
  body("price").custom((value) => {
    if (!value) throw new Error("price field cannot be empty");
    if (!Number(value)) throw new Error("price value must be a number");
    if (value > 1000) throw new Error("price value cannot exceed 1000");
  }),
  body("stock").custom((value) => {
    if (!value) throw new Error("stock field cannot be empty");
    if (!Number(value)) throw new Error("stock value  must be a number");
  }),
  async (req: Request, res: Response) => {
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
    const error = validationResult(req);

    if (error.isEmpty()) {
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

      return res.status(201).json({ message: `Added accessory: ${name}` });
    }
    const formatErr = error.array().map(({ msg }) => msg);
    return res.status(400).json({ message: formatErr });
  },
];

export const getAccessory = async (req: Request, res: Response) => {
  const { accessID } = req.params;

  if (!isValidObjectId(accessID)) {
    return res.status(400).json({ message: `id ${accessID} is invalid` });
  }

  const accessory = await Accessory.findById(accessID);

  if (Object.keys(accessory).length) {
    return res.status(200).json(accessory);
  } else {
    return res.status(404).json({
      message: `accessory with id: ${accessID} does not exist`,
    });
  }
};

export const editAccessory = async (req: Request, res: Response) => {
  const { accessID } = req.params;
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

  if (!isValidObjectId(accessID)) {
    return res.status(400).json({ message: `id ${accessID} is invalid` });
  }

  const accessoryExists = await Accessory.findById(accessID);

  if (accessoryExists) {
    const updateAccessory: {
      name?: string;
      description?: string;
      img?: string;
      related_instruments?: string;
      brand?: string;
      features?: string[];
      price?: number;
      stock?: number;
    } = {};

    if (name) updateAccessory.name = name;
    if (description) updateAccessory.description = description;
    if (img) updateAccessory.img = img;
    if (related_instruments)
      updateAccessory.related_instruments = related_instruments;
    if (brand) updateAccessory.brand = brand;
    if (features) updateAccessory.features = features;
    if (price) updateAccessory.price = price;
    if (stock || stock === 0) updateAccessory.stock = stock;

    await Accessory.findByIdAndDelete(accessID, updateAccessory)
      .then(() => {
        res.status(201).send({ message: "update success" });
      })
      .catch((e) => res.status(500).send({ message: "update unsuccessful" }));
  } else {
    res.status(404).json({
      message: `accessory with id: ${accessID} does not exist`,
    });
  }
};

export const deleteAccessory = async (req: Request, res: Response) => {
  const { accessID } = req.params;

  if (!isValidObjectId(accessID)) {
    return res.status(400).json({ message: `id ${accessID} is invalid` });
  }

  await Accessory.findByIdAndDelete(accessID)
    .then(() => {
      res.status(200).send({ message: "delete success" });
    })
    .catch((e) => {
      res.status(500).json({ message: "delete action failed" });
    });
};
