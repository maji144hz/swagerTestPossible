const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const app = express();
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const userRouter = require("./routes/user.router");
const supplierRouter = require("./routes/supplier.router");
const purchaseOrderRouter = require("./routes/purchaseOrder.router");
const cartRouter = require("./routes/cart.router");
const categoryRouter = require("./routes/category.router");
const orderRouter = require("./routes/order.router");
const productRouter = require("./routes/product.router");
const promotionRouter = require("./routes/promotion.router");
const statusRouter = require("./routes/status.router");

try {
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Connect to mongo DB Successfully");
} catch (error) {
  console.log("DB Connection Failed", error);
}

app.use(cors({ origin: BASE_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  swaggerOptions: {
    tagsSorter: 'alpha',
    operationsSorter: 'alpha'
  }
}));

app.get("/", (req, res) => {
  res.send("<h1>Welcome to SE NPRU Blog RESTful API</h1>");
});

app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/promotion", promotionRouter);
app.use("/api/v1/status", statusRouter);
app.use("/api/v1/purchase-orders", purchaseOrderRouter);
app.use("/api/v1/supplier", supplierRouter);
app.use("/api/v1/auth", userRouter);
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

