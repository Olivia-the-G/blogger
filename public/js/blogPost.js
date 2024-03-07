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


// add event listener to edit button
const editBtn = document.getElementById('edit-post-btn')
editBtn.addEventListener('click', triggerEditPost);

// trigger edit post form when edit button is clicked
function triggerEditPost(event) {
  const postId = event.target.getAttribute('data-post-id');

  // fetch existing post data
  fetch(`/api/blogposts/${postId}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to retrieve post data');
      }
    }).then(postData => {
      // populate the edit post form with the existing post data
      document.getElementById('edit-post-title').value = postData.post_title;
      document.getElementById('edit-post-content').value = postData.content;
    }).catch(error => {
      console.error(error);
    });

    // display the edit post form
  const editPostDiv = document.getElementById('edit-post');
  if (editPostDiv) {
    editPostDiv.style.display = 'block'; // Show the edit form
  } else {
    console.error("editPostDiv is not found in the DOM");
  }
  
  event.preventDefault();
}

