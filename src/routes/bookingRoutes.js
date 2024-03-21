const express = require("express");
const { getBookingDetails } = require("../controller/bookingController");

const router = express.Router();

router.post("/:id", getBookingDetails);

module.exports = router;
