# Location-Based Delivery System

This project provides a location-based delivery system with both a frontend and backend. Users can select and manage delivery locations on an interactive map, while the backend manages the data for addresses and items.

## Technology Stack

### Frontend
- **React**: For building the user interface.
- **TailwindCSS**: For responsive and clean styling.
- **Google Maps API**: For map and location functionalities.
- **React Icons**: For intuitive and beautiful icons.

### Backend
- **Express**: For creating the API server.
- **MongoDB**: For storing addresses and items.
- **Mongoose**: For interacting with MongoDB.
- **CORS**: For handling cross-origin requests.

## Prerequisites

### Frontend
- **Node.js** (>= 14.x)
- **npm** or **yarn**
- A valid **Google Maps API Key**.

### Backend
- **Node.js** (>= 14.x)
- **MongoDB**: A MongoDB database instance (local or hosted).
- **npm** or **yarn**.

## Installation

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/nikhiltelase/Location-Based-Delivery-System.git
   cd Location-Based-Delivery-System/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env` file and add your Google Maps API key:
     ```env
     VITE_GOOGLE_MAP_API_KEY=your-google-maps-api-key
     ```

4. Start the frontend development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open the application in your browser at `http://localhost:5173`.

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd Location-Based-Delivery-System/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env` file and add your MongoDB URI:
     ```env
     MONGODB_URI=your-mongodb-uri
     PORT=5000
     ```

4. Start the backend server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. The server will be running at `http://localhost:5000`.

## Project Structure

```plaintext
Location-Based-Delivery-System/
├── frontend/            # React frontend
│   ├── src/             # React source code
│   ├── public/          # Public assets
│   └── .env             # Frontend environment variables
├── backend/             # Express backend
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── .env             # Backend environment variables
├── package.json         # Project metadata and dependencies
├── README.md            # Project documentation
└── .gitignore           # Git ignore file
```

## API Routes

### Address Routes
- **GET /address/get**: Retrieve all addresses
- **POST /address/create**: Create a new address
- **PUT /address/update/:id**: Update an address by ID
- **DELETE /address/delete/:id**: Delete an address by ID

### Item Routes
- **GET /item/get**: Retrieve all items
- **POST /item/create**: Create a new item

## Available Scripts

- **`npm run dev`**: Start the frontend development server.
- **`npm run start`**: Start the backend server.
- **`npm run build`**: Build the frontend project for production.
- **`npm run preview`**: Preview the production build.

## Future Enhancements

- User authentication for personalized address management.
- Integration with a backend to save and retrieve addresses.
- Support for multiple languages in the UI.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- **Google Maps API**: For map and geolocation services.
- **TailwindCSS**: For the amazing utility-first CSS framework.

If you encounter any issues or have suggestions, feel free to [create an issue](https://github.com/your-repo/location-delivery-frontend/issues).
```

### Key Sections:
1. **Installation**: Instructions for setting up both the frontend and backend.
2. **Project Structure**: Directory layout for both parts of the project.
3. **API Routes**: A summary of the available backend routes.
4. **Available Scripts**: Common commands for running and building both the frontend and backend.
5. **Future Enhancements**: Potential improvements for the project.

This combined README simplifies the setup and provides both frontend and backend instructions in a concise format. Adjust the repository URLs and details as per your project specifics.