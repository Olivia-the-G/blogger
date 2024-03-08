const filterByUserId = (blogposts, userId) => {
  return blogposts.filter(blogpost => blogpost.user_id === userId);
};

// const currentUser = (req) => {
//   return req.session.user_id;
// };

// const postPermissions = (currentUser, blogpost) => {
//   return (currentUser === blogpost.user_id);
// };

module.exports = filterByUserId;