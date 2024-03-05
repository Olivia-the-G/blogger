
// when idle for a certain amount of time the user can still view posts but needs to sign in to make a post, update or delete

const logout = async () => {
  try {
    // fetch the logout route
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    // redirect to the homepage once logged out
    if (response.ok) {
      document.location.replace('/');
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    alert(error.message);
  }
};


// Call the logout function when the logout button is clicked
document.getElementById('logoutBtn')
document.addEventListener('click', logout);