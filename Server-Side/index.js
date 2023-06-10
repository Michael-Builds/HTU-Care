const dotenv = require("dotenv");
const colors = require("colors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

//rest object
const app = express();

// dotenv config
dotenv.config();

//will be adding some features of the middleware here

//modeling the user data
require("./models/User");

const requireToken = require("./middleware/requireToken");
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const healthRecordsRouter = require("./routes/healthRecords");
const prescriptionRouter = require("./routes/prescriptionRoutes");

app.use(bodyParser.json());
app.use(authRoutes);
app.use(appointmentRoutes);
app.use(healthRecordsRouter);
app.use(prescriptionRouter);

//Pull request
app.get("/", requireToken, (req, res) => {
  res.send({
    username: req.user.username,
    email: req.user.email,
  });
});

//Database conection
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Database Connected Successfully!!`.bgGreen.white))
  .catch((error) =>
    console.error(`Error Connecting to Database: ${error.message}`.bgRed.white)
  );

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

//Port callback
const port = process.env.PORT;

//Port listener
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_MODE} mode on port ${port}`.bgCyan
      .white
  );
});
