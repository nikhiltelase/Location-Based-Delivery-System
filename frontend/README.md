# Frontend for Location-Based Delivery System

## Overview
This is the frontend for a location-based delivery system built using React, TailwindCSS, and the Google Maps API. The application allows users to:

- Select a delivery location using an interactive map.
- Search for locations using an autocomplete address input.
- View and confirm the current address based on selected coordinates.
- Enter additional address details (e.g., area, landmark) via a form.

## Features

1. **Interactive Map**:
   - Integrated with Google Maps API.
   - Supports selecting a location by clicking on the map or dragging a marker.
   - Includes a "Locate Me" button for fetching the user’s current location.

2. **Address Management**:
   - Display current address fetched from coordinates.
   - Save detailed delivery addresses with categories (e.g., Home, Office).

3. **Responsive UI**:
   - Built with TailwindCSS for a modern, professional, and fully responsive interface.

## Technology Stack

- **React**: For building the user interface.
- **TailwindCSS**: For responsive and clean styling.
- **Google Maps API**: For map and location functionalities.
- **React Icons**: For intuitive and beautiful icons.

## Prerequisites

Before running the project, ensure that you have the following installed:

- **Node.js** (>= 14.x)
- **npm** or **yarn**
- A valid **Google Maps API Key** with access to the Maps and Places APIs.

## Installation

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

3. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add your Google Maps API key:
     ```env
     VITE_GOOGLE_MAP_API_KEY=your-google-maps-api-key
     ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open the application in your browser at `http://localhost:5173`.

## Project Structure

```plaintext
frontend/
├── node_modules/        # Installed dependencies
├── public/              # Public assets (e.g., favicon)
├── src/                 # Application source code
│   ├── components/      # Reusable UI components
│   │   ├── AddressForm.jsx          # Form for adding address details
│   │   ├── LocationModal.jsx        # Modal for location selection
│   │   ├── LocationPermissionModal.jsx # Handles location permission requests
│   │   ├── Map.jsx                  # Google Map integration
│   │   ├── ProductDetails.jsx       # Component for product details
│   │   └── SavedAddresses.jsx       # Component for managing saved addresses
│   ├── contexts/        # Context API for state management
│   │   └── LocationContext.jsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useFetch.js              # Hook for handling API requests
│   │   └── useGoogleMapsScript.js   # Hook for loading Google Maps scripts
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point for React
├── .env                 # Environment variables
├── .gitignore           # Ignored files for Git
├── eslint.config.js     # ESLint configuration
├── index.html           # Main HTML file
├── package.json         # Project metadata and dependencies
├── postcss.config.js    # PostCSS configuration
├── README.md            # Project documentation
├── tailwind.config.js   # TailwindCSS configuration
└── vite.config.js       # Vite configuration
```

## Available Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the project for production.
- **`npm run preview`**: Preview the production build.

## Environment Variables

The following environment variable is required:

- `VITE_GOOGLE_MAP_API_KEY`: Your Google Maps API key.

## Future Enhancements

- Add user authentication for personalized address management.
- Integrate with a backend to save and retrieve addresses.
- Include support for multiple languages in the UI.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- **Google Maps API**: For providing the map and geolocation services.
- **TailwindCSS**: For the amazing utility-first CSS framework.

---

If you encounter any issues or have suggestions, feel free to ask me.