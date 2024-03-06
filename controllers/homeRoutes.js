const router = require('express').Router();
const { BlogPost } = require('../models');
const { User } = require('../models');
const { Comment } = require('../models');
const logLock = require('../utils/logLock');


//get all posts
router.get('/', async (req, res) => {
  try {    
    // Get all posts
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const blogposts = blogPostData.map((blogpost) => blogpost.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogposts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one post with its comments
router.get('/blogposts/:id', logLock, async (req, res) => {
  try {
    // Get post by its id along with comments
    const blogPostData = await BlogPost.findByPk(req.params.id, {
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

    console.log(blogPostData);

    const commentData = await Comment.findAll({
      where: {
        blogpost_id: req.params.id
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    const blogpost = blogPostData.get({ plain: true });

    // Extract comments from the blog post data
    const comments = commentData.map(comment => comment.get({ plain: true }));

    if (comments.length === 0) {
      comments = "No comments yet";
    }

    console.log(comments);

    // Render the blog post along with its comments
    res.render('blogpost', {
      blogpost,
      comments,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// serve up dashboard when user is logged in 
router.get('/dashboard', logLock, async (req, res) => {
  try {
    // find the user 
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: BlogPost }],
    });

    //serialize user data
    const user = userData.get({ plain: true });

     // Get all posts
     const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const blogposts = blogPostData.map((blogpost) => blogpost.get({ plain: true }));

    // render the dashboard template, passing the user data and blogposts
    res.render('dashboard', {
      user,
      blogposts,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// serve up login page when user is not logged in
router.get('/login', (req, res) => {
  // if the user is already logged in, redirect to the dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  // otherwise, render the 'login' template
  res.render('login');
});

module.exports = router;