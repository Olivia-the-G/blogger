const { BlogPost } = require('../models');
const { User } = require('../models');
const { Comment } = require('../models');

const router = require('express').Router();


  router.get('/', async (req, res) => {
    try {
      res.render('homepage', { 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  });



module.exports = router;