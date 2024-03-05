
// login route
const loginRouteHandler = async (event) => {
  event.preventDefault();

  // convert the username and password to JSON to be sent to the server
  const username = JSON.stringify(document.querySelector('#login-username').value.trim());
  const password = JSON.stringify(document.querySelector('#login-password').value.trim());

  if (username && password) {
    try {
      // set up post request in JSON format
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      // redirect to the dashboard once logged in successfully
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

  // convert the username and password to JSON
  const username = JSON.stringify(document.querySelector('#signup-username').value.trim());
  const password = JSON.stringify(document.querySelector('#signup-password').value.trim());

  if (username && password) {
    try {
      // set up post request for user info to be saved
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      // redirect to dashboard once logged in 
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