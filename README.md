# Work Experience Management API

This is a RESTful API for managing work experiences. It provides endpoints for performing CRUD (Create, Read, Update, Delete) operations on work experiences.

## Features

- **Get all work experiences:** Retrieve a list of all work experiences.
- **Get a specific work experience:** Retrieve details of a specific work experience by its ID.
- **Add a new work experience:** Create a new work experience entry.
- **Update a work experience:** Update details of an existing work experience.
- **Delete a work experience:** Delete a work experience entry.

## Technologies Used

- **Node.js:** JavaScript runtime for building the server-side application.
- **Express.js:** Web application framework for Node.js used to build the API endpoints.
- **MongoDB:** NoSQL database used for storing work experience data.
- **Mongoose:** MongoDB object modeling tool used for interacting with the MongoDB database.

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Set up the MongoDB database:
   - Make sure MongoDB is installed and running locally.
   - Create a new database named `cv`.
5. Start the server: `npm start`

## API Endpoints

- **GET /workexperience:** Retrieve all work experiences.
- **GET /workexperience/:id:** Retrieve details of a specific work experience by its ID.
- **POST /workexperience:** Add a new work experience.
- **PUT /workexperience/:id:** Update details of an existing work experience by its ID.
- **DELETE /workexperience/:id:** Delete a work experience by its ID.

## Usage

1. Start the server.
2. Use tools like Postman or write client-side code to interact with the API endpoints.
3. Send HTTP requests to the appropriate endpoints to perform CRUD operations on work experiences.
