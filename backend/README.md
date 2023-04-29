# VOTING API
## A REST API for a voting application.
### Short project description goes here.

#### Table of Contents
* Installation
* Usage
* API Endpoints
* Technologies Used
* Contributing
* License

**Installation**
- Clone the repository.
- Install dependencies: npm install.
- Create a `.env `file based on the `.env.example` file and update the environment variables.
- Start the development server: `npm run dev`.

**Usage**

To use the application, open your web browser and navigate to http://localhost:3000. You should see the homepage of the application.

**API Endpoints**

Here are the available API endpoints:

- GET `/api/candidates:` Get a list of all candidates.
- GET `/api/candidates/:id:` Get a candidate by ID.
- POST `/api/candidates:` Create a new candidate.
- PUT `/api/candidates/:id: `Update a candidate by ID.
- DELETE `/api/candidates/:id: `Delete a candidate by ID.


**Technologies Used**

- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript

**Contributing**

Contributions are welcome! To contribute, please follow these steps:

**Fork the repository.**

- Create a new branch for your feature: `git checkout -b feature/your-feature-name`.
- Commit your changes: `git commit -m "Add some feature".`
- Push to the branch: `git push origin feature/your-feature-name`.
- Create a new pull request.

**License**

This project is licensed under the **MIT License**.