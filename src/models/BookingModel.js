module.exports = (sequelize, DataTypes) => {
	const Booking = sequelize.define(
		"booking",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			trainId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			seatNumbers: DataTypes.ARRAY(DataTypes.JSON),
		},
		{ timestamps: true }
	);
	return Booking;
};
