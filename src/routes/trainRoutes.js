const express = require("express");
const {
	createNewTrain,
	getTrainAvailability,
	bookSeat,
} = require("../controller/trainController");

const router = express.Router();

router.post("/create", createNewTrain);
router.get("/availability", getTrainAvailability);
router.post("/:id/book", bookSeat);

module.exports = router;
