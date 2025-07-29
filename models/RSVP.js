const { mongoose } = require("../config/db")

const RSVP = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["going", "interested", "not_going"],
    default: "going",
  },
}, { timestamps: true })

module.exports = mongoose.model("RSVP", RSVP)
