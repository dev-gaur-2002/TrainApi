module.exports = (sequelize, DataTypes) => {
	const Train = sequelize.define(
		"train",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			trainName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			source: {
				type: DataTypes.STRING,
				unique: true,
				isEmail: true,
				allowNull: false,
			},
			destination: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			seatCapacity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			arrivalTimeAtSource: {
				type: DataTypes.TIME,
				allowNull: false,
			},
			arrivalTimeAtDestination: {
				type: DataTypes.TIME,
				allowNull: false,
			},
			availableSeats: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{ timestamps: true }
	);
	return Train;
};
