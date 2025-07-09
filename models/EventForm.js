const { mongoose } = require("../config/db")

const Event = new mongoose.Schema(
    {
        // Title is the title of the event
        // It is in the format of a string
        // It is required to provide a title when creating an event
        // This will help in identifying the event
        Title: {
            type: String,
            max: 50,
            required: true,
        },
        // Description is the description of the event
        // It is in the format of a string
        // It is required to provide a description when creating an event
        // This will help in understanding the event details
        Description: {
            type: String,
            max: 100,
            required: true,
        },
        // Location is the location of the event
        // It is in the format of a string
        // It is required to provide a location when creating an event
        Location: {
            type: String,
            max: 100,
            required: true,
        },
        // Date is the date of the event
        // It is in the format of YYYY-MM-DD
        // It is required to select a date from the calendar when creating an event 
        Date: {
            type: Date,
            default: Date.now,

        },
        // Time is the time of the event
        // It is in the format of HH:MM:SS  
        Time: {
            type: String,
            default: "00:00:00",
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
        // Image is the image URL of the event
        // It is in the format of a URL
        // It is optional to provide an image URL when creating an event
        // This will help in displaying the event image
        image: {
            type: String,
            default: "https://via.placeholder.com/150"
        },
    },},
    { timestamps: true }
)

module.exports = mongoose.model("Event", Event)

