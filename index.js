const express = require("express");
const sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const db = require("./src/db");
const userRoutes = require("./src/routes/userRoutes");
const trainRoutes = require("./src/routes/trainRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

db.sequelize.sync({ force: true }).then(() => {
	console.log("db has been re sync");
});

app.use("/api/users", userRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
