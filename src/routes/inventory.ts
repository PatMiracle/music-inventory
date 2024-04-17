import { Router } from "express";

const router = Router();

// BRANDS

router.get("/brands");
router.post("/brands");
router.get("/brands/:brandName");
router.put("/brands/:brandName");
router.delete("/brands/:brandName");

// Categories

router.get("/categories");
router.post("/categories");
router.get("/categories/:categoryName");
router.put("/categories/:categoryName");
router.delete("/categories/:categoryName");

// Instruments

router.get("/instruments");
router.post("/instruments");
router.get("/instruments/:instrumentID");
router.put("/instruments/:instrumentID");
router.delete("/instruments/:instrumentID");

// Accessories

router.get("/accessories");
router.post("/accessories");
router.get("/accessories/:accessID");
router.put("/accessories/:accessID");
router.delete("/accessories/:accessID");

export default router;
