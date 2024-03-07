const filterByUserId = (blogposts, userId) => {
  return blogposts.filter(blogpost => blogpost.user_id === userId);
};

module.exports = filterByUserId;