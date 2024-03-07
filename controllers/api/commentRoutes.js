const router = require('express').Router();
const { Comment } = require('../../models');
const loglock = require('../../utils/logLock');

// create a new comment
router.post('/', loglock, async (req, res) => {
  try {
    const newComment = await Comment.create({
      blogpost_id: req.body.blogpost_id,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a comment by its id

// delete a comment by its id

module.exports = router;