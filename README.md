# API Server Application Readme

This repository contains an API server application written in TypeScript using Node.js and Express.js. The application utilizes several packages to enhance its functionality.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the required dependencies.

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Specify the necessary environment variables in the `.env` file. For example:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=user
   DB_PASSWORD=password
   DB_DATABASE=test
   JWT_SECRET_KEY=yourjwtsecret
   ```
   Adjust the values based on your specific configuration.

## Usage

1. Ensure that you have completed the installation and configuration steps.
2. Run `npm start` to start the API server.
3. The server will be accessible at `http://localhost:<PORT>`, where `<PORT>` is the value specified in the `.env` file.

## Docker Compose - MySQL database

To simplify the setup and use of the MySQL database, you can use Docker Compose.
Follow the steps below to set up the MySQL database using Docker Compose:

1. Install Docker and Docker Compose on your machine if you haven't already. (https://www.docker.com/)
2. Check **'docker-compose.yml'** file that has exactly the same value like your **.env**
3. Run the following command in the project's root directory to start the MySQL database:

   ```
   docker-compose up
   ```

   Docker Compose will automatically download the necessary MySQL image and start the database container.

## Packages Used

The application utilizes the following packages to enhance its functionality:

- **Validation Joi**: A powerful validation library for validating request data and input.
- **ESLint and Prettier**: Tools for code linting and formatting to maintain code quality and consistency.
- **HTTP-status-code**: A library that provides a convenient way to work with HTTP status codes.
- **Sequelize ORM**: A powerful ORM (Object-Relational Mapping) library for interacting with databases.
- **MySQL Database**: The MySQL database is used as the data storage for this application.
- **dotenv**: A package that loads environment variables from a `.env` file into `process.env`.
- **jsonwebtoken**: A library for generating and verifying JSON Web Tokens (JWT) used for authentication and authorization.

## Endpoints

The following endpoints are available in the API:

### Get API Key

Returns an API key that is needed to access the user endpoints.

- **Endpoint**: GET /api/key

- **Sample Response**:

  ```json
  {
    "token": "yourToken"
  }
  ```

  The `token` value should be included in the request headers as `Authorization: Bearer <yourToken>` for all user endpoints.

### Get All Users

Returns an array of all users in the database. Users can be filtered by a role query parameter.

- **Endpoint**: GET /api/users

- **Query Parameters**:
  - `role`: Return only users with the selected role (admin or user)

- **Sample Response**:

  ```json
  [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "jsmith@gmail.com",
      "role": "user"
    },
    {
      "id": 2,
      "firstName": "Jan",
      "lastName": "Kowalski",
      "email": "jkowalski@gmail.com",
      "role": "admin"
    },
    {
      "id": 3,
      "firstName": "",
      "lastName": "",
      "email": "example@gmail.com",
      "role": "user"
    }
  ]
  ```

### Get User

Returns an object containing user data.

- **Endpoint**: GET /api/user/:id

- **Path Parameters**:

  - `id`: ID of the user

- **Sample Response**:

  ```json
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Smith",
    "email": "jsmith@gmail.com",
    "role": "user"
  }
  ```

### Create User

Creates a new user record in the database. User data should be based on the request body.

- **Endpoint**: POST /api/user

- **Request Body**: Object with the following properties:

  - `firstName`: First name of the user
  - `lastName`: Last name of the user
  - `email`: Email address of the user (required)
  - `role`: Role of

 the user (user or admin) (required)

- **Sample Response**: Status code 201

### Update User

Updates the user record in the database with data provided in the request body.

- **Endpoint**: PATCH /api/user/:id

- **Path Parameters**:

  - `id`: ID of the user

- **Request Body**: Object with the following properties (should contain at least one property):

  - `firstName`: First name of the user (optional)
  - `lastName`: Last name of the user (optional)
  - `role`: Role of the user (user or admin) (optional)

### Delete User

Removes the user record from the database.

- **Endpoint**: DELETE /api/user/:id

- **Path Parameters**:

  - `id`: ID of the user

- **Sample Response**: Status code 200

## License

This project is licensed under the MIT LICENSE. Feel free to use and modify it according to your needs.

## Contact

If you have any questions or suggestions regarding this project, please feel free to contact the project maintainer at [karolchrobok@gmail.com](mailto:karolchrobok@gmail.com).

