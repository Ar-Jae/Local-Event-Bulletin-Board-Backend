const { mongoose } = require("../config/db")

const Event = new mongoose.Schema(
    {
        Title: {
            type: String,
            max: 150,
            required: true,
        },
        Description: {
            type: String,
            max: 500,
            required: true,
        },
        Location: {
            type: String,
            max: 250,
            required: true,
        },
        when: {
            type: Date,
            default: Date.now,
        },
        Category: {
            type: String,
            
            // enum is short for enumeration, and it defines a set of allowed values for a variable or schema field.
            // This is a list of predefined categories for events
            // You can add or remove categories as needed
            // This will help in categorizing events
            // It is required to select one of the categories
            // from the list when creating an event
            // This will help in filtering events based on categories
            // This will help in searching events based on categories

            enum: [
                'Block Party','Yard Sale','Workshop',
                'Yoga Class','Town Hall','Book Club',
                'Art Show','Clean-Up Drive','Fundraiser',
                'Kids Activity','Cultural Festival','Open Mic',
                'Fitness Class','Movie Night','Community BBQ'],
            required: true,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Event", Event)