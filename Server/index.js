const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const notFound = require("./Middleware/notFound");
const errorHandler = require("./Middleware/errorHandler");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use("/auth", require("./Route/AuthRoute"));
app.use("/staff", require("./Route/EmployeeRoute"));
app.use("/student", require("./Route/StudentRoute"));
app.use("/book", require("./Route/BookRoute"));
app.use('/api', require('./Route/takenRoutes'));


app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT;

const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
