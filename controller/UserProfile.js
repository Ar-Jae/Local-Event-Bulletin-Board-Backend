const router = require('express').Router();
const Event = require('../models/EventForm'); // Corrected to require EventForm.js, which registers 'Event' model
const RSVP = require('../models/RSVP');
const User = require('../models/User');

// Get user profile info, events, and RSVPs
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    const events = await Event.find({ userId: req.params.userId });
    const rsvps = await RSVP.find({ userId: req.params.userId }).populate('eventId');
    res.status(200).json({ user, events, rsvps });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
