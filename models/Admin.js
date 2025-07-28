const { mongoose } = require("../config/db")

const UserAdmin= new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'disapproved'],
            default: 'pending',
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("UserAdmin", UserAdmin)