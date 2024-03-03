const { BlogPost } = require('../models');
const { User } = require('../models');
const { Comment } = require('../models');

const logLock = require('../utils/logLock');

const router = require('express').Router();

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
    const posts = blogPostData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one post
router.get('/blogpost/:id', async (req, res) => {
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

    const post = blogPostData.get({ plain: true });

    // pass serialized data and session flag into template
    res.render('blogpost', {
      ...post,
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

    // render the dashboard template, passing the user data
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// serve up login page when user is not logged in
router.get('/login', (req, res) => {
  // if the user is already logged in, redirect to the home page
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  // otherwise, render the 'login' template
  res.render('login');
});

module.exports = router;