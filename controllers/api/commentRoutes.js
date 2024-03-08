const router = require('express').Router();
const { Comment } = require('../../models');
const { User } = require('../../models');
const logLock = require('../../utils/logLock');

// create a new comment
router.post('/', logLock, async (req, res) => {
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

// get a single comment by its id
router.get('/:id', logLock, async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [User]
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment post found with this id!' });
      return;
    }

    // return data in JSON format
    res.json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a comment by its id
router.put('/:id', logLock, async (req, res) => {
  try {
    const commentData = await Comment.update({
      content: req.body.content,
      blogpost_id: req.body.blogpost_id,
    },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        }
      });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a comment by its id
router.delete('/:id', logLock, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;