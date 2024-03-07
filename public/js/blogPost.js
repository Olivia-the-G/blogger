// new post event handler
const newPostHandler = async (event) => {
  event.preventDefault();

  // convert the title and content to JSON
  const post_title = document.querySelector('#post-title').value.trim();
  const post_content = document.querySelector('#post-content').value.trim();

  // fetch the new post route
  if (post_title && post_content) {
    try {
      console.log(JSON.stringify({ post_title, post_content }))
      const response = await fetch('/api/blogposts', {
        method: 'POST',
        body: JSON.stringify({ post_title, post_content }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      // redirect to the updated dashboard once the new post is created
      if (response.ok) {
        document.location.replace('/dashboard');
        console.log('New post created');
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      alert(error.message);
    }
  }
};

// event listener for the new post button
document.querySelector('new-post-form')
document.addEventListener('submit', newPostHandler);

