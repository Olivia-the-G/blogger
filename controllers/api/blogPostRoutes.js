const router = require('express').Router();
const { BlogPost } = require('../../models');
const { User } = require('../../models');
const logLock = require('../../utils/logLock');

// create a new blog post + update dashboard
router.post('/', logLock, async (req, res) => {
  try {
    const blogPostData = await BlogPost.create({
      post_title: req.body.post_title,
      content: req.body.post_content,
      user_id: req.session.user_id,
    });
    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get a single blogpost by its id
router.get('/:id', logLock, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [User]
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    // return data in JSON format
    res.json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a blog post by its id
router.put('/:id', logLock, async (req, res) => {
  try {
    const blogPostData = await BlogPost.update({
      post_title: req.body.post_title,
      content: req.body.post_content,
    },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        }
      });
    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a blog post by its id
router.delete('/:id', logLock, async (req, res) => {
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    });
    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
