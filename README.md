# Restaurant API

This project is a RESTful API for managing restaurants and their meals, built with Nest.js. The API allows for CRUD operations on restaurants and meals, along with authentication and authorization mechanisms. Images are stored securely using AWS S3.

## Features

- **Restaurant Management**: Create, update, delete, and retrieve restaurants.
- **Meal Management**: Create, update, delete, and retrieve meals associated with restaurants.
- **Image Upload**: Upload images for restaurants, stored in AWS S3.
- **User Authentication**: User registration and login with JWT-based authentication.
- **Authorization**: Protected routes to ensure only authorized users can perform certain actions.

## Endpoints

### Restaurants

- **Get All Restaurants (with Query)**
  - **GET** `/restaurants?keyword={keyword}&page={pageNumber}`
  - Retrieve a list of restaurants with optional search by keyword and pagination.

- **Get All Restaurants (Admin)**
  - **GET** `/restaurants/admin`
  - Retrieve a list of all restaurants (Admin-only endpoint).

- **Create Restaurant**
  - **POST** `/restaurants`
  - Example request body:
    ```json
    {
      "name": "example",
      "description": "example",
      "email": "example@gmail.com",
      "phoneNo": 5551344555,
      "category": "Fast Food, Cafe or Fine Dining",
      "address": "example address"
    }
    ```

- **Get Restaurant by ID**
  - **GET** `/restaurants/{id}`
  - Retrieve details of a specific restaurant by its ID.

- **Update Restaurant by ID**
  - **PUT** `/restaurants/{id}`
  - Update a specific restaurant's details by its ID.

- **Delete Restaurant by ID**
  - **DELETE** `/restaurants/{id}`
  - Delete a specific restaurant by its ID.

- **Upload Restaurant Image**
  - **PUT** `/restaurants/upload/{id}`
  - Upload an image for a specific restaurant by its ID, stored in AWS S3.

### Meals

- **Create Meal**
  - **POST** `/meals`
  - Example request body:
    ```json
    {
      "name": "example",
      "description": "example",
      "price": 11.55,
      "category": "Soups, Salads, Sandwiches or Pasta",
      "restaurant": "{restaurant id}"
    }
    ```

- **Get All Meals**
  - **GET** `/meals`
  - Retrieve a list of all meals.

- **Get All Meals by Restaurant**
  - **GET** `/meals/restaurant/{restaurantId}`
  - Retrieve all meals associated with a specific restaurant by its ID.

- **Get Meal by ID**
  - **GET** `/meals/{id}`
  - Retrieve details of a specific meal by its ID.

- **Update Meal by ID**
  - **PUT** `/meals/{id}`
  - Update a specific meal's details by its ID.

- **Delete Meal by ID**
  - **DELETE** `/meals/{id}`
  - Delete a specific meal by its ID.
  - The meal is also removed from the restaurant's menu upon deletion.

### Authentication

- **Register**
  - **POST** `/auth/signup`
  - Register a new user.

- **Login**
  - **GET** `/auth/login`
  - Login with existing user credentials to obtain a Bearer token for authorization.

## Authorization

All protected routes require a Bearer token. This token is obtained upon successful login and must be included in the `Authorization` header of the request:

```
Authorization: Bearer {token}
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/UlviParviz/nest-restaurant-api.git
   cd nest-restaurant-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Before starting the project, fill in the environment variables in the `.env.development` file:
   ```env
   PORT=

   DB_URL=
   NODE_ENV=

   GEOCODER_PROVIDER=
   GEOCODER_API_KEY=

   AWS_S3_BUCKET_NAME=
   AWS_ACCESS_KEY_ID=
   AWS_SECRET_KEY=

   JWT_SECRET=
   JWT_EXPIRES=
   ```

4. Run the development server:
   ```bash
   npm run start:dev
   ```

## Testing

To run tests, use the following command:

```bash
npm run test
```
