const { mongoose } = require("../config/db")

const Reports= new mongoose.Schema(
    {
        post: {
            type: String,
            required: true,
            max: 50,
        },
        description: {
            type: String,
            required: true,
            max: 50,
        },
        detail: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Reports", Reports)