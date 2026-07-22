import express from "express";

import {
  getFees,
  addFee,
  updateFee,
  deleteFee,
} from "../controllers/feeController.js";

const router = express.Router();

// Get All Fees
router.get("/", getFees);

// Add Fee
router.post("/", addFee);

// Update Fee
router.put("/:id", updateFee);

// Delete Fee
router.delete("/:id", deleteFee);

export default router;