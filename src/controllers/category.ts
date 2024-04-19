import Category, { ICategory } from "../models/Category";
import { Request, Response } from "express";

export const index = async (_req: Request, res: Response) => {
  const categories = await Category.find({});
  if (Object.keys(categories).length) {
    res.status(200).json(categories);
  } else res.status(404).json({ message: "no categories created" });
};

export const addCategory = async (req: Request, res: Response) => {
  const { name, description, cover_img } = req.body;

  if (!name || !description || !cover_img) {
    return res.status(400).send({
      message: "fields name, description and cover_img cannot be empty",
    });
  }

  const categoryExists = await Category.exists({ name: name });

  if (categoryExists) {
    const category = new Category({ name, description, cover_img });
    await category.save();
    return res.status(200).json({ message: `Added category: ${name}` });
  } else {
    res.status(409).json({ message: `Category name ${name} already exists` });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  const { categoryName } = req.params;

  const category = await Category.find({ name: categoryName });

  if (Object.keys(category).length) {
    return res.status(200).json(category);
  } else {
    return res
      .status(404)
      .json({ message: `category name ${categoryName} does not exist` });
  }
};

export const editCategory = async (req: Request, res: Response) => {
  const { categoryName } = req.params;
  const { name, description, cover_img } = req.body;

  if (!name && !description && !cover_img) {
    return res.status(400).json({ message: `no specified field to update` });
  }

  const categoryExists = await Category.exists({ name: categoryName });

  if (categoryExists) {
    const updateCategory: {
      name?: string;
      description?: string;
      cover_img?: string;
    } = {};

    if (name) {
      updateCategory.name = name;
    }
    if (description) {
      updateCategory.description = description;
    }
    if (cover_img) {
      updateCategory.cover_img = cover_img;
    }

    await Category.findOneAndUpdate({ name: categoryName }, updateCategory)
      .then(() => {
        res.status(200).send({ message: "update success" });
      })
      .catch((e) => res.status(500).send({ message: "update unsuccessful" }));
  } else {
    res
      .status(404)
      .json({ message: `category ${categoryName} does not exist` });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { categoryName } = req.params;

  await Category.deleteOne({ name: categoryName })
    .then(() => {
      res.status(200).send({ message: "delete success" });
    })
    .catch((e) => {
      res.status(500).json({ message: "delete action failed" });
    });
};
