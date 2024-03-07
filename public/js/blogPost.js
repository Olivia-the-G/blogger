
// add event listener to edit button
const editBtn = document.getElementById('edit-post-btn')
editBtn.addEventListener('click', triggerEditPost);

// trigger edit post form when edit button is clicked
function triggerEditPost(event) {
  // const postId = event.target.getAttribute('data-post-id').value;
  const blogpost_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  // fetch existing post data
  fetch(`/api/blogposts/${blogpost_id}`)
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
};

// handle the edit post form submission
const editPostHandler = async (event) => {
  event.preventDefault();

  // get the post id from the edit button
  const blogpost_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // convert the title and content to JSON
  const post_title = document.querySelector('#edit-post-title').value.trim();
  const post_content = document.querySelector('#edit-post-content').value.trim();

  const postData = { post_title, post_content };

  // fetch the update post route
  try {
    const response = await fetch(`/api/blogposts/${blogpost_id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    // reload page
    if (response.ok) {
      document.location.replace('/dashboard');
      console.log('Post updated');
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    alert(error.message);
  }
}

// event listener for the edit post form
const editPostSubmit = document.querySelector('#edit-post-form')
editPostSubmit.addEventListener('submit', editPostHandler);

// delete post event handler
const deletePostHandler = async (event) => {
  event.preventDefault();

  // get the post id
  const blogpost_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // fetch the delete post route
  try {
    const response = await fetch(`/api/blogposts/${blogpost_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    // redirect to dashboard
    if (response.ok) {
      document.location.replace('/dashboard');
      console.log('Post deleted');
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    alert(error.message);
  }
}

// event listener for the delete post button
const deletePostSubmit = document.querySelector('#delete-post-btn')
deletePostSubmit.addEventListener('click', deletePostHandler);