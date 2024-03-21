const bcrypt = require("bcrypt");
const db = require("../db");
const jwt = require("jsonwebtoken");

const User = db.users;

const signup = async (req, res) => {
	try {
		const { username, email, password, role } = req.body;
		const data = {
			username,
			email,
			role,
			password: await bcrypt.hash(password, 10),
		};

		const user = await User.create(data);

		if (user) {
			let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
				expiresIn: 1 * 24 * 60 * 60 * 1000,
			});

			res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

			return res.status(201).json({
				status: "Account created successfully",
				status_code: 200,
				user_id: user.id,
			});
		} else {
			return res.status(409).send("Details are not correct");
		}
	} catch (error) {
		console.log(error);
	}
};

//login authentication
const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({
			where: {
				username: username,
			},
		});

		if (user) {
			const isSame = await bcrypt.compare(password, user.password);

			if (isSame) {
				let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
					expiresIn: 1 * 24 * 60 * 60 * 1000,
				});

				res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
				return res.status(200).json({
					status: "Login successful",
					status_code: 200,
					user_id: user.id,
					access_token: token,
				});
			} else {
				return res.status(401).json({
					status: "Incorrect username/password provided. Please retry",
					status_code: 401,
				});
			}
		} else {
			return res.status(401).json({
				status: "Incorrect username/password provided. Please retry",
				status_code: 401,
			});
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	signup,
	login,
};
