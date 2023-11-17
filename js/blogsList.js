const url = "https://www.weronkakarczmarczyk.no/wp-json/wp/v2/posts";
const detailContainer = document.getElementById("results");

function showError(message) {
  const errorContainer = document.getElementById("results");
  errorContainer.innerHTML = `<h2>Error: ${message}</h2>`;
}

async function fetchPosts() {
  try {
    const loadingIndicator = document.getElementById("loading-indicator");
    loadingIndicator.style.display = "block";

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch Posts');
    }
    const result = await response.json();

    detailContainer.innerHTML = "";
    const posts = result;

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const postDate = new Date(post.date);
      const formattedDate = postDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });



      detailContainer.innerHTML += `<a href="specific-post.html?id=${post.id}" class="card">
                                <h2>${post.title.rendered}</h2>
                                <h3>${formattedDate}</h3>
                                <h4>${post.better_featured_image.alt_text}</h4>
                                <img src="${post.better_featured_image.source_url}">
                                </a>`;
}
    loadingIndicator.style.display = "none";
  } catch (error) {
    showError(error.message); 
  }
}

fetchPosts();