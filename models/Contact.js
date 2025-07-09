const { mongoose } = require("../config/db")

const Contact= new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            unique: false,
        },
        message: {
            type: String,
            required: true,
            max: 500,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Contact", Contact)