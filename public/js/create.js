// new post event handler
const newPostHandler = async (event) => {
  event.preventDefault();

  // convert the title and content to JSON
  const post_title = JSON.stringify(document.querySelector('#post-title').value.trim());
  const post_content = JSON.stringify(document.querySelector('#post-content').value.trim());

  // fetch the new post route
  if (post_title && post_content) {
    try {
      const response = await fetch('/api/blogpost/:id', {
        method: 'POST',
        body: JSON.stringify({ post_title, post_content }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      // redirect to the updated dashboard once the new post is created
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      alert(error.message);
    }
  }
};

// event listener for the new post button
document.getElementById('new-post-btn')
document.addEventListener('submit', newPostHandler);

// new comment event handler
const newCommentHandler = async (event) => {
  event.preventDefault();
};

// event listener for the new comment button
document.getElementById('new-comment')
document.addEventListener('submit', newCommentHandler);
