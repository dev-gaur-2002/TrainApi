const db = require("../db");

const Train = db.trains;
const Booking = db.bookings;

const createNewTrain = async (req, res) => {
	try {
		const {
			train_name,
			source,
			destination,
			seat_capacity,
			arrival_time_at_source,
			arrival_time_at_destination,
		} = req.body;

		const train = Train.create({
			trainName: train_name,
			source,
			destination,
			seatCapacity: seat_capacity,
			arrivalTimeAtSource: arrival_time_at_source,
			arrivalTimeAtDestination: arrival_time_at_destination,
			availableSeats: seat_capacity,
		});

		if (train) {
			return res.status(201).json({
				message: "Train added successfully",
				train_id: train.id,
			});
		} else {
			return res.status(500).json({
				message: "Internal server error",
			});
		}
	} catch (error) {
		console.log(error);
	}
};

const getTrainAvailability = async (req, res) => {
	try {
		const { source, destination } = req.query;

		const trains = await Train.findAll({
			where: {
				source: source,
				destination: destination,
			},
		});

		if (trains) {
			return res.status(200).send(trains);
		} else {
			return res.status(500).json({
				message: "No seats available",
			});
		}
	} catch (error) {
		console.log(error);
	}
};

const bookSeat = async (req, res) => {
	try {
		const { id: trainId } = req.params;
		const { user_id, no_of_seats } = req.body;

		const train = await Train.FindOne({
			where: {
				id: trainId,
			},
		});

		if (!train) {
			return res.status(500).json({
				message: "You are looking for a train that does not exists",
			});
		}

		if (train.availableSeats >= no_of_seats) {
			try {
				train.availableSeats -= no_of_seats;
				await train.save();

				const booking = await Booking.create({
					userId: user_id,
					trainId: trainId,
					seatNumbers: [train.availableSeats + 1, train.availableSeats + 2],
				});

				if (!booking) {
					return res.status(500).json({
						message: "internal server error",
					});
				}
				return res.status(201).json({
					message: "Seat booked successfully",
					booking_id: booking.id,
					seat_numbers: [train.availableSeats + 1, train.availableSeats + 2],
				});
			} catch (error) {
				console.log(error);
			}
		}

		return res.status(500).json({
			message: "train does not have enough seats available",
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	createNewTrain,
	getTrainAvailability,
	bookSeat,
};
