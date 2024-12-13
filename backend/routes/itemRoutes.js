import express from 'express';
import { createItems, getAllItems } from '../controllers/itemController.js';

const router = express.Router();

// Route to get all items
router.get('/get', getAllItems);

//  Create a new item
router.post('/create', createItems);

export default router;
