
// get blog post by id
document.getElementById('blog-post').addEventListener('click', async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('id');

  if (id) {
    try {
      const response = await fetch(`/api/blogpost/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace(`/blogpost/${id}`);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      alert(error.message);
    }
  }
});