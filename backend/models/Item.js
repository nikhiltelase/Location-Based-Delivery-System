import mongoose from 'mongoose';

// Item schema definition
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name of the item, mandatory field
    },
    description: {
      type: String,
      required: true, // Description of the item, mandatory field
    },
    price: {
      type: Number,
      required: true, // Price of the item, mandatory field
    },
    image: {
      type: String,
      required: true, // URL or path of the item image, mandatory field
    },
  },
  { timestamps: true } // Automatically include createdAt and updatedAt fields
);

// Create and export the Item model
const Item = mongoose.model('Item', itemSchema);

export default Item;