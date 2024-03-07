// new comment event handler
const newCommentHandler = async (event) => {
  event.preventDefault();

  // convert the comment to JSON
  const content = document.querySelector('#comment-form-content').value.trim();
  const blogpost_id = document.querySelector('#blogpost-id').value;

  // fetch the new comment route
  if (content) {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, blogpost_id }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      // redirect to the updated blogpost once the new comment is created
      if (response.ok) {
        document.location.replace(`/blogposts/${blogpost_id}`);
        console.log('New comment created');
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      alert(error.message);
    }
  }
};

// event listener for the new comment button
document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler);
