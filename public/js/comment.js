// new comment event handler
const newCommentHandler = async (event) => {
  event.preventDefault();

  // convert the comment to JSON
  const content = document.querySelector('#comment-form-content').value.trim();
  const blogpost_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
    // fetch the new comment route
  if (content) {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ blogpost_id, content }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      // reload updated comments section
      if (response.ok) {
        document.location.reload();
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
document.querySelector('.new-comment-form')
document.addEventListener('submit', newCommentHandler);
