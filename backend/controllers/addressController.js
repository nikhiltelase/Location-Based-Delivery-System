import { Address } from '../models/Address.js';

//Get all addresses from the database.
export const getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find().sort({ createdAt: -1 });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Create a new address in the database.
export const createAddress = async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Update an existing address in the database.
export const updateAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    res.json(address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete an address from the database.
export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    res.status(204).send(); // No content
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
