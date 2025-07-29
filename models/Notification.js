const { mongoose } = require("../config/db")

const Notification = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  message: {
    type: String,
    required: true,
    maxlength: 200,
  },
  read: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true })

module.exports = mongoose.model("Notification", Notification)
