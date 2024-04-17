import { Router } from "express";

import * as brandController from "../controllers/brand";

const router = Router();

// BRANDS

router.get("/brands", brandController.index);
router.post("/brands", brandController.addBrand);
router.get("/brands/:brandName", brandController.getBrand);
router.patch("/brands/:brandName", brandController.editBrand);
router.delete("/brands/:brandName", brandController.deleteBrand);

// Categories

router.get("/categories");
router.post("/categories");
router.get("/categories/:categoryName");
router.patch("/categories/:categoryName");
router.delete("/categories/:categoryName");

// Instruments

router.get("/instruments");
router.post("/instruments");
router.get("/instruments/:instrumentID");
router.patch("/instruments/:instrumentID");
router.delete("/instruments/:instrumentID");

// Accessories

router.get("/accessories");
router.post("/accessories");
router.get("/accessories/:accessID");
router.patch("/accessories/:accessID");
router.delete("/accessories/:accessID");

export default router;
