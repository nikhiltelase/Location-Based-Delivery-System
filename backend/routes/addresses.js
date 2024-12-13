import express from "express";
import {
  getAllAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";

const router = express.Router();

// Define routes for managing addresses
router.get("/get", getAllAddresses);

// Create a new address
router.post("/create", createAddress);

// Update an existing address by ID
router.put("/update/:id", updateAddress);

// Delete an address by ID
router.delete("/delete/:id", deleteAddress);

export default router;
