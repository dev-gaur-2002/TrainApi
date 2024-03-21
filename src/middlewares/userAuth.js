const express = require("express");
const db = require("../db");
const User = db.users;

const saveUser = async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				username: req.body.username,
			},
		});
		if (user) {
			return res.json(409).send("username already taken");
		}

		const emailcheck = await User.findOne({
			where: {
				email: req.body.email,
			},
		});
		if (emailcheck) {
			return res.json(409).send("Authentication failed");
		}

		next();
	} catch (error) {
		console.log(error);
	}
};

const isAdmin = async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				username: req.body.username,
			},
		});
		if (user) {
			return res.json(409).send("username already taken");
		}
		const emailcheck = await User.findOne({
			where: {
				email: req.body.email,
			},
		});
		if (emailcheck) {
			return res.json(409).send("Authentication failed");
		}
		if (user.role === "user") {
			return res.json(401).json({
				error: "you do not have neccessary permissions to perform this action",
			});
		}

		next();
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	saveUser,
	isAdmin,
};
