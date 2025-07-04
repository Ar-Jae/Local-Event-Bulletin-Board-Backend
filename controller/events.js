const EventForm = require('../models/EventForm');

const router = require('express').Router();


router.get('/events', async (req, res) => {
    try {
        const events = await EventForm.find();
        res.status(200).json(events);
        console.log(events);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/event', async (req, res) => {
    try {
        const {Title, Description, Location,image, date, Time, Category} = req.body;

        const newEvent = new EventForm({
            Title,
            Description,
            Location,
            image: image || "https://via.placeholder.com/150",
            date: date || Date.now(),
            Time,
            Category
        });
        console.log(newEvent);

        await newEvent.save();

        res.status(201).json({
            event: newEvent,
            message: 'Event created successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;
        
// create isAdmin permissions 

        const updatedEvent = await EventForm.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );
        console.log(updatedEvent);

        if (!updatedEvent) throw new Error('updated Event not found');


        res.status(200).json({
            updatedEvent,
            message: 'Event updated successfully'
        
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
// create isAdmin permissions
        const deleteEvent = await EventForm.findByIdAndDelete(id);
        console.log(deleteEvent);

        if (!deleteEvent) throw new Error('Event not found');
        
        res.status(200).json({ message: 'Event deleted successfully' });
        


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `${error.message}` });
    }
});


module.exports = router;
