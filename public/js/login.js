// when user is signed in the sign in button turns into a sign out button

// logout option logs user out of the site

// when idle for a certain amount of time the user can still view posts but needs to sign in to make a post, update or delete


// login route
const loginRouteHandler = async (event) => {
  event.preventDefault();

  const username = JSON.stringify(document.querySelector('#login-username').value.trim());
  const password = JSON.stringify(document.querySelector('#login-password').value.trim());

  if (username && password) {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json'
        },
      });

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

// attach event listener to the login form
document.querySelector('.loginForm')
document.addEventListener('submit', loginRouteHandler);

// signup route
const signupRouteHandler = async (event) => {
  event.preventDefault();

  const username = JSON.stringify(document.querySelector('#signup-username').value.trim());
  const password = JSON.stringify(document.querySelector('#signup-password').value.trim());

  if (username && password) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json'
        },
      });

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

// attach event listener to the signup form
document.querySelector('.signupForm')
document.addEventListener('submit', signupRouteHandler);