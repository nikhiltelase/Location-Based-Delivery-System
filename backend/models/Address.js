import mongoose from 'mongoose';

// Address schema definition
const addressSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['home', 'office', 'other'], // Limiting the values for address type
    },
    flatNumber: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      default: '', // Default to an empty string if no landmark is provided
    },
    location: {
      lat: {
        type: Number,
        required: true, // Latitude is mandatory
      },
      lng: {
        type: Number,
        required: true, // Longitude is mandatory
      },
    },
    isFavorite: {
      type: Boolean,
      default: false, // Default is false, indicating it's not marked as a favorite by default
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the creation date
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create and export the Address model
export const Address = mongoose.model('Address', addressSchema);
