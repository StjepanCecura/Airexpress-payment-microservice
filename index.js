const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const createCartRoute = require("./routes/createCartRoute");
const getCartByIdRoute = require("./routes/getCartByIdRoute");
const addProductToCartRoute = require("./routes/addProductToCartRoute");
const createCartForCustomerRoute = require("./routes/createCartForCustomerRoute");
const getCartByCustomerIdRoute = require("./routes/getCartByCustomerIdRoute");
const removeProductFromCartRoute = require("./routes/removeProductFromCartRoute");
const addShippingAddresRoute = require("./routes/addShippingAddressRoute");
const createOrderRoute = require("./routes/createOrderRoute");

dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.get("/getCartById", getCartByIdRoute);
app.get("/getCartByCustomerId", getCartByCustomerIdRoute);

app.post("/createCart", createCartRoute);
app.post("/createCartForUser", createCartForCustomerRoute);
app.post("/addProductToCart", addProductToCartRoute);
app.post("/removeProductFromCart", removeProductFromCartRoute);
app.post("/addShippingAddress", addShippingAddresRoute);
app.post("/createOrder", createOrderRoute);

app.listen(port, () => {
  console.log(`Receipt service on port: ${port}`);
});
