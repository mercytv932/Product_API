# Product API

This project is an Express API for managing product records in MongoDB. It supports creating, reading, updating, and deleting products, and it also includes basic filtering and pagination when retrieving products.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Change into the project directory:

   ```bash
   cd product-api
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Environment Variables

This project uses environment variables. Create a `.env` file in the project root before starting the server.

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
PORT=3000
```

### Required variables

- `MONGO_URI`: MongoDB connection string used by Mongoose to connect to the database.
- `PORT`: Optional port for the Express server. If not provided, the app falls back to `3000`.

> Do not commit your `.env` file to GitHub. Keep the real connection string and local settings on your machine only.

## Running the Application

This project does not define a `dev` script in `package.json`, so start the app with:

```bash
node server.js
```

The server runs on port `3000` by default, or on the value in `PORT` if it is set.

Local URL:

```text
http://localhost:3000
```

## Testing / Usage

This is a backend API for product management.

### API endpoints

- `POST /api/products`
  - Create a new product.
- `GET /api/products/:id`
  - Get a single product by ID.
- `PUT /api/products/:id`
  - Update a product by ID.
- `DELETE /api/products/:id`
  - Delete a product by ID.
- `GET /api/products`
  - Get all products with optional filtering and pagination.

### Optional query parameters for `GET /api/products`

- `category` - Filter products by category.
- `minPrice` - Filter products with a price greater than or equal to the value.
- `maxPrice` - Filter products with a price less than or equal to the value.
- `sortBy` - Sort the results using `price_asc` or `price_desc`.
- `page` - Page number for pagination.
- `limit` - Number of results per page.

### Example requests

#### Create a product

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "price": 999.99,
    "category": "Electronics",
    "description": "Gaming laptop"
  }'
```

#### Get all products

```bash
curl "http://localhost:3000/api/products?category=Electronics&minPrice=100&maxPrice=2000&sortBy=price_asc&page=1&limit=10"
```

#### Get one product by ID

```bash
curl http://localhost:3000/api/products/<product-id>
```

#### Update a product

```bash
curl -X PUT http://localhost:3000/api/products/<product-id> \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1099.99,
    "category": "Electronics"
  }'
```

#### Delete a product

```bash
curl -X DELETE http://localhost:3000/api/products/<product-id>
```

### Using Postman

1. Open Postman.
2. Create a new request.
3. Set the HTTP method to `GET`, `POST`, `PUT`, or `DELETE`.
4. Enter a URL such as:
   - `http://localhost:3000/api/products`
   - `http://localhost:3000/api/products/<product-id>`
5. Add a JSON body if needed.
6. Click `Send` to view the response.

## Important Notes

- This project requires a MongoDB database and a valid `MONGO_URI` connection string.
- You can use MongoDB Atlas or a local MongoDB instance.
- The app uses `dotenv` to load environment variables from the `.env` file.
- There is no frontend for this project; it is a backend API only.
- The app runs on port `3000` unless the `PORT` environment variable is set.
