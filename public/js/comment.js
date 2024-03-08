// new comment event handler
const newCommentHandler = async (event) => {
  event.preventDefault();

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



// trigger edit comment form when edit button is clicked
function triggerEditComment(event) {

  const comment_id = event.target.getAttribute('data-comment-id');

  // fetch existing post data
  fetch(`/api/comments/${comment_id}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to retrieve comment data');
      }
    }).then(commentData => {
      // populate the edit comment form with the existing comment data
      document.getElementById('edit-comment-content').value = commentData.content;
    }).catch(error => {
      console.error(error);
    });

    // display the edit comment form
  const editCommentDiv = document.getElementById('edit-comment');
  if (editCommentDiv) {
    editCommentDiv.style.display = 'block'; // Show the edit form
  } else {
    console.error("editCommentDiv is not found in the DOM");
  }
  
  event.preventDefault();
};



// edit comment event handler
const editCommentHandler = async (event) => {
  event.preventDefault();


  const comment_id = document.getElementById('edit-comment-btn').getAttribute('data-comment-id');

  const blogpost_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const content = document.querySelector('#edit-comment-content').value.trim();

  const commentData = content;

  // fetch the update comment route
  try {
    const response = await fetch(`/api/comments/${comment_id}`, {
      method: 'PUT',
      body: JSON.stringify({ blogpost_id, commentData }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    // reload page
    if (response.ok) {
      document.location.replace(`/blogposts/${blogpost_id}`);
      console.log(`Comment updated at ${comment_id}: ${commentData}`);
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    alert(error.message);
  }
}

// delete comment event handler
const deleteCommentHandler = async (event) => {
  event.preventDefault();

  const comment_id = event.target.getAttribute('data-comment-id');

  const blogpost_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  console.log(`Deleting comment at ${comment_id}`);

  // fetch the delete comment route
  try {
    const response = await fetch(`/api/comments/${comment_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    // reload page
    if (response.ok) {
      document.location.replace(`/`);
      console.log(`Comment deleted at ${comment_id}`);
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    alert(error.message);
  }
}



// event listener for the new comment button
const newCommentSubmit = document.getElementById('new-comment-btn')
newCommentSubmit.addEventListener('click', newCommentHandler);

// Figure out if there are comments on the page
const comments = document.getElementsByClassName('comment');
if (comments.length) {
  const editCommentBtn = document.getElementById('edit-comment-btn');
  editCommentBtn.addEventListener('click', triggerEditComment);
};

// event listener for the edit comment submission
const editCommentSubmit = document.getElementById('save-comment-btn')
editCommentSubmit.addEventListener('click', editCommentHandler);

// event listener for the delete comment button
if (comments.length) {
  const deleteCommentBtn = document.getElementById('delete-comment-btn');
  deleteCommentBtn.addEventListener('click', deleteCommentHandler);
};