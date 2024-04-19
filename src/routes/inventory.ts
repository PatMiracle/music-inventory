import { Router } from "express";

import * as brandController from "../controllers/brand";
import * as categoryController from "../controllers/category";
import * as instrumentController from "../controllers/instrument";

const router = Router();

// BRANDS

router.get("/brands", brandController.index);
router.post("/brands", brandController.addBrand);
router.get("/brands/:brandName", brandController.getBrand);
router.put("/brands/:brandName", brandController.editBrand);
router.delete("/brands/:brandName", brandController.deleteBrand);

// Categories

router.get("/categories", categoryController.index);
router.post("/categories", categoryController.addCategory);
router.get("/categories/:categoryName", categoryController.getCategory);
router.put("/categories/:categoryName", categoryController.editCategory);
router.delete("/categories/:categoryName", categoryController.deleteCategory);

// Instruments

router.get("/instruments", instrumentController.index);
router.post("/instruments", instrumentController.addInstrument);
router.get("/instruments/:instrumentID", instrumentController.getInstrument);
router.put("/instruments/:instrumentID", instrumentController.editInstrument);
router.delete(
  "/instruments/:instrumentID",
  instrumentController.deleteInstrument
);

// Accessories

router.get("/accessories");
router.post("/accessories");
router.get("/accessories/:accessID");
router.put("/accessories/:accessID");
router.delete("/accessories/:accessID");

export default router;
