const router = require('express').Router();
const EventForm = require('../models/EventForm');
const multer = require('multer');
const path = require('path');

// Event search and filtering endpoint
router.get('/search', async (req, res) => {
  try {
    const { category, date, location, title } = req.query;
    const filter = {};
    if (category) filter.Category = category;
    if (date) filter.Date = { $eq: new Date(date) };
    if (location) filter.Location = { $regex: location, $options: 'i' };
    if (title) filter.Title = { $regex: title, $options: 'i' };
    const events = await EventForm.find(filter);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
const { body, validationResult } = require('express-validator');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });


router.get('/events', async (req, res) => {
    try {
        const events = await EventForm.find();
        res.status(200).json(events);
        console.log(events);

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Internal server error' });
    }
});

router.post(
  '/event',
  upload.single('Image'),
  [
    body('Title').notEmpty().withMessage('Title is required'),
    body('Description').notEmpty().withMessage('Description is required'),
    body('Location').notEmpty().withMessage('Location is required'),
    body('Date').notEmpty().withMessage('Date is required'),
    body('Time').notEmpty().withMessage('Time is required'),
    body('Category').notEmpty().withMessage('Category is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { Title, Description, Location, Date, Time, Category } = req.body;
      let imageUrl = req.body.image || "https://images.unsplash.com/photo-1667489022797-ab608913feeb?auto=format&fit=crop&w=800&q=60";
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
            console.log('Image file saved:', req.file.path);
            console.log('Image URL for DB:', imageUrl);
        } else {
            console.log('No image file uploaded, using default:', imageUrl);
        }

        const newEvent = new EventForm({
            Title,
            Description,
            Location,
            date: Date || Date.now(),
            Time,
            Category,
            image: imageUrl
        });
        console.log('Event to be saved:', newEvent);

        await newEvent.save();

        res.status(201).json({
            event: newEvent,
            message: 'Event created successfully',
            imageUrl: imageUrl
        });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message || 'Internal server error' });
    }
  }
);

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
