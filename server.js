const express = require("express");
const router = require("./routes/productRoutes.js");
const connectDB = require("./config/connection.js");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use("/api/products", router);

app.listen(PORT, () => {
  console.log(`Server live on port http://localhost:${PORT}`);
});
