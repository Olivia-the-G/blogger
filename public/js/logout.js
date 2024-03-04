
// when idle for a certain amount of time the user can still view posts but needs to sign in to make a post, update or delete

const logout = async () => {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

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
document.getElementById('logoutBtn').addEventListener('click', logout);