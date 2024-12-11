import express from 'express';
import { createItems, getAllItems } from '../controllers/itemController.js';

const router = express.Router();

// Route to get all items
/**
 * @route GET /get
 * @desc Get all items
 * @access Public
 */
router.get('/get', getAllItems);

/**
 * @route POST /create
 * @desc Create a new item
 * @access Public
 */
router.post('/create', createItems);

export default router;
