const router = require('express').Router();
const { BlogPost } = require('../../models');
const { User } = require('../../models');
const { Comment } = require('../../models');
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

//get one post
router.get('/:id', logLock, async (req, res) => {
  try {
    // get post by its id
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      // include creator, comments and their creators
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    const blogpost = blogPostData.get({ plain: true });

    // pass serialized data and session flag into template
    res.render('blogpost', {
      blogpost,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a blog post by its id

// delete a blog post by its id

module.exports = router;
