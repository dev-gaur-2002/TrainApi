const db = require("../db");

const Booking = db.bookings;
const Train = db.trains;
const User = db.users;

const getBookingDetails = async (req, res) => {
	try {
		const { id: bookingId } = req.params;

		const booking = await Booking.FindOne({
			where: {
				id: bookingId,
			},
		});
		if (!booking) {
			return res.status(500).json({
				message: "booking not found",
			});
		}

		const train = await Train.FindOne({
			where: {
				id: booking.trainId,
			},
		});

		const user = await await Train.FindOne({
			where: {
				id: booking.userId,
			},
		});

		return res.status(200).json({
			booking_id: booking.id,
			train_id: train.id,
			train_name: train.name,
			user_id: user.id,
			seat_numbers: booking.seatNumbers,
			arrival_time_at_source: train.arrival_time_at_source,
			arrival_time_at_destination: train.arrival_time_at_destination,
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getBookingDetails,
};
