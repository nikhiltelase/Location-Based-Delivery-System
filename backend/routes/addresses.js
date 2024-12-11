import express from 'express';
import {
  getAllAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from '../controllers/addressController.js'; 

const router = express.Router();

// Define routes for managing addresses
/**
 * @route GET /get
 * @desc Get all addresses
 * @access Public
 */
router.get('/get', getAllAddresses);

/**
 * @route POST /create
 * @desc Create a new address
 * @access Public
 */
router.post('/create', createAddress);

/**
 * @route PUT /update/:id
 * @desc Update an existing address by ID
 * @access Public
 */
router.put('/update/:id', updateAddress);

/**
 * @route DELETE /delete/:id
 * @desc Delete an address by ID
 * @access Public
 */
router.delete('/delete/:id', deleteAddress);

export default router;
