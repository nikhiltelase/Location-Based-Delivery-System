# Express Server with MongoDB Integration

This is a simple Express server application that connects to a MongoDB database. The project supports managing addresses and items through RESTful API endpoints. It is built using **Express**, **MongoDB** with **Mongoose**, and **CORS** for handling cross-origin requests. Environment variables are loaded using **dotenv**.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Routes](#routes)
- [Running the Server](#running-the-server)
- [License](#license)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nikhiltelase/Location-Based-Delivery-System.git
   ```

2. **Navigate to the project folder**:
   ```bash
   cd Location-Based-Delivery-System/backend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   Create a `.env` file in the root of the project and add the following:

   ```env
   MONGODB_URI=mongodb://your_mongo_db_uri_here
   PORT=3000
   ```

## Configuration

- **MongoDB**: The project uses MongoDB as the database. Make sure you have a MongoDB instance running, and configure the `MONGODB_URI` in the `.env` file.
- **CORS**: The application uses the `cors` middleware to enable cross-origin requests.

## Routes

### Address Routes
- **GET /address/get**: Retrieve all addresses
- **POST /address/create**: Create a new address
- **PUT /address/update/:id**: Update an address by ID
- **DELETE /address/delete/:id**: Delete an address by ID

### Item Routes
- **GET /item/get**: Retrieve all items
- **POST /item/create**: Create a new item

## Running the Server

1. **Start the server**:
   ```bash
   npm start
   ```

   The server will start on port 3000 (or the port specified in the `.env` file). You should see the following message in the console:

   ```bash
   Server running on port: http://localhost:3000
   ```

2. **Access the API**: 
   - You can now make requests to the API endpoints listed above using a tool like Postman or directly from your frontend.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Key Sections:
1. **Installation**: Steps for cloning the repo, installing dependencies, and configuring the environment.
2. **Configuration**: Explanation about how to set up MongoDB and the environment variables.
3. **Routes**: Description of available API endpoints and their methods.
4. **Running the Server**: Instructions on how to start the server and access the API.
5. **License**: Mention of the project's license.

