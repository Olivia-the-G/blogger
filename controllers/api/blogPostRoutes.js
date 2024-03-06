const router = require('express').Router();
const { BlogPost } = require('../../models');
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


// update a blog post by its id

// delete a blog post by its id

module.exports = router;
