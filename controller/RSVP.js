const router = require('express').Router();
const RSVP = require('../models/RSVP');

// Create RSVP
router.post('/', async (req, res) => {
  try {
    const { eventId, userId, status } = req.body;
    const rsvp = new RSVP({ eventId, userId, status });
    await rsvp.save();
    res.status(201).json({ rsvp, message: 'RSVP created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get RSVPs for an event
router.get('/event/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const rsvps = await RSVP.find({ eventId }).populate('userId', 'firstName lastName email');
    res.status(200).json(rsvps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get RSVPs for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const rsvps = await RSVP.find({ userId }).populate('eventId', 'Title Date Location');
    res.status(200).json(rsvps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
