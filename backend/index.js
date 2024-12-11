import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDatabase from './config/database.js'; // Import database configuration
import addressRoutes from './routes/addresses.js';
import itemRoutes from './routes/itemRoutes.js';

dotenv.config(); // Load environment variables

const app = express();

// Connect to the database
connectDatabase();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse incoming URL-encoded data

// Routes
app.use('/address', addressRoutes); // Address-related routes
app.use('/item', itemRoutes); // Item-related routes

// Root route for basic testing
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable for port or default to 3000
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
