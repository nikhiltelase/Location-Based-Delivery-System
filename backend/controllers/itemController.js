import Item from '../models/Item.js';

//Get all items from the database.
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error: error.message });
  }
};

//Create a new item in the database.
export const createItems = async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json({ message: 'Item created successfully', item });
  } catch (error) {
    res.status(400).json({ message: 'Error creating item', error: error.message });
  }
};
