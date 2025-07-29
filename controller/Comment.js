const router = require('express').Router();
const Comment = require('../models/Comment');

// Add a comment to an event
router.post('/', async (req, res) => {
  try {
    const { eventId, userId, text } = req.body;
    const comment = new Comment({ eventId, userId, text });
    await comment.save();
    res.status(201).json({ comment, message: 'Comment added' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get comments for an event
router.get('/event/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const comments = await Comment.find({ eventId }).populate('userId', 'firstName lastName email');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
