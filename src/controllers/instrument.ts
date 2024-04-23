import Instrument, { InstrumentI } from "../models/Instrument";
import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { body, validationResult } from "express-validator";

export const index = async (_req: Request, res: Response) => {
  const instruments = await Instrument.find({});
  if (Object.keys(instruments).length) {
    res.status(200).json(instruments);
  } else res.status(404).json({ message: "no instrument created" });
};

export const addInstrument = [
  body("name").trim().notEmpty().withMessage("name field cannot be empty"),
  body("img").notEmpty().withMessage("img field cannot be empty"),
  body("category").notEmpty().withMessage("category field cannot be empty"),
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
    const { name, description, img, category, brand, features, price, stock } =
      req.body;

    const error = validationResult(req);

    if (!error.isEmpty()) {
      const formatErr = error.array().map(({ msg }) => msg);
      return res.status(400).json({ message: formatErr });
    }

    if (price > 1000) {
      return res
        .status(400)
        .json({ message: "price should be less than or 1000" });
    }

    const instrumentDetail: InstrumentI = { name, img, category, price, stock };

    if (description) instrumentDetail.description = description;
    if (brand) instrumentDetail.brand = brand;
    if (features) instrumentDetail.features = features;

    const instrument = new Instrument(instrumentDetail);
    await instrument.save();

    return res.status(201).json({ message: `Added instrument: ${name}` });
  },
];

export const getInstrument = async (req: Request, res: Response) => {
  const { instrumentID } = req.params;

  if (!isValidObjectId(instrumentID)) {
    return res.status(400).json({ message: `id ${instrumentID} is invalid` });
  }
  const instrument = await Instrument.findById(instrumentID);

  if (Object.keys(instrument).length) {
    return res.status(200).json(instrument);
  } else {
    return res.status(404).json({
      message: `instrument with id: ${instrumentID} does not exist`,
    });
  }
};

export const editInstrument = async (req: Request, res: Response) => {
  const { instrumentID } = req.params;
  const { name, description, img, category, brand, features, price, stock } =
    req.body;

  if (!isValidObjectId(instrumentID)) {
    return res.status(400).json({ message: `id ${instrumentID} is invalid` });
  }

  const instrumentExists = await Instrument.findById(instrumentID);

  if (instrumentExists) {
    const updateInstrument: {
      name?: string;
      description?: string;
      img?: string;
      category?: string;
      brand?: string;
      features?: string[];
      price?: number;
      stock?: number;
    } = {};

    if (name) updateInstrument.name = name;
    if (description) updateInstrument.description = description;
    if (img) updateInstrument.img = img;
    if (category) updateInstrument.category = category;
    if (brand) updateInstrument.brand = brand;
    if (features) updateInstrument.features = features;
    if (price) updateInstrument.price = price;
    if (stock || stock === 0) updateInstrument.stock = stock;

    await Instrument.findByIdAndUpdate(instrumentID, updateInstrument)
      .then(() => {
        res.status(201).send({ message: "update success" });
      })
      .catch((e) => res.status(500).send({ message: "update unsuccessful" }));
  } else {
    res
      .status(404)
      .json({ message: `instrument with id: ${instrumentID} does not exist` });
  }
};

export const deleteInstrument = async (req: Request, res: Response) => {
  const { instrumentID } = req.params;

  if (!isValidObjectId(instrumentID)) {
    return res.status(400).json({ message: `id ${instrumentID} is invalid` });
  }

  await Instrument.findByIdAndDelete(instrumentID)
    .then(() => {
      res.status(200).send({ message: "delete success" });
    })
    .catch((e) => {
      res.status(500).json({ message: "delete action failed" });
    });
};
