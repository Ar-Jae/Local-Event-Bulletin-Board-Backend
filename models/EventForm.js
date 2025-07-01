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
        Date: {
            type: Date,
            default: Date.now,

        },
        Time: {
            type: String,
            default: "HH:MM:SS",
            required: true,
            // This is a string that represents the time of the event
            // It is in the format of HH:MM, where HH is the hour and MM is the minute
            // It is required to select one of the times from the list when creating an event
            // This will help in filtering events based on time
            // This will help in searching events based on time
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
                'Art Show',
                'Block Party',
                'Book Club',
                'Clean-Up Drive',
                'Community BBQ',
                'Cultural Festival',
                'Fitness Class',
                'Fundraiser',
                'Kids Activity',
                'Movie Night',
                'Open Mic',
                'Town Hall',
                'Workshop',
                'Yard Sale',
                'Yoga Class'
              ],
            required: true,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Event", Event)

