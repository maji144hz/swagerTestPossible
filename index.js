const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const userRouter = require("./routes/user.router");
const supplierRouter = require("./routes/supplier.router");
const purchaseOrderRouter  = require("./routes/purchaseOrder.router");
const cartRouter  = require("./routes/cart.router");
const categoryRouter  = require("./routes/category.router");
const orderRouter  = require("./routes/order.router");
const productRouter  = require("./routes/product.router");
const promotionRouter  = require("./routes/promotion.router");
const statusRouter  = require("./routes/status.router");
const swaggerSetup = require('./docs/swagger');

try {
  mongoose.connect(DB_URL);
  console.log("Connect to mongo DB Successfully");
} catch (error) {
  console.log("DB Connection Failed");
}

// ตั้งค่า CORS
const corsOptions = {
  origin: true, // อนุญาตให้ทุก origin เข้าถึงได้
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 600,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// เพิ่ม middleware สำหรับ OPTIONS requests
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Setup Swagger
swaggerSetup(app);

app.get("/", (req, res) => {
  res.send("<h1>Welcom to SE NPRU Blog resfull api</h1>");
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
  console.log("Swagger documentation available at http://localhost:" + PORT + "/api-docs");
});

