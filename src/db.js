const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
	`postgres://postgres:password@localhost:5432/trainApi`,
	{ dialect: "postgres" }
);

sequelize
	.authenticate()
	.then(() => {
		console.log(`Database connected to trainApi`);
	})
	.catch((err) => {
		console.log(err);
	});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./models/UserModel")(sequelize, DataTypes);
db.trains = require("./models/TrainModel")(sequelize, DataTypes);
db.bookings = require("./models/BookingModel")(sequelize, DataTypes);

module.exports = db;
