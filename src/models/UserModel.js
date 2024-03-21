module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"user",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				isEmail: true,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			role: {
				type: DataTypes.ENUM("user", "admin"),
			},
		},
		{ timestamps: true }
	);
	return User;
};
