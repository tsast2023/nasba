const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRoute");
const brandRouter = require("./routes/brandRoutes");
const reviewRouter = require('./routes/reviewRoutes');
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

dbConnect();
app.use(cors({origin : "http://localhost:3000"}));

app.use(morgan("dev"));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/brand", brandRouter);
app.use('/api/review', reviewRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is runing on PORT ${PORT}`);
});
