const loadingIndicator = document.getElementById("loading-indicator");
const detailPosts = document.getElementById("post-details");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");


if (!id) {
  showError("Post ID is not found in the query string");
} else {
  url = "https://www.weronkakarczmarczyk.no/wp-json/wp/v2/posts/" + id;
  loadingIndicator.style.display = "block";

  async function fetchPost() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch post with that id');
        }
        const details = await response.json();
        console.log(details);
        createHtml(details);
        document.title = details.title.rendered;
    } catch (error) {
        showError(error.message);
    } finally {
        loadingIndicator.style.display = "none";
    }
}

  fetchPost();

  function showError(message) {
    const errorContainer = document.getElementById("titlePosts");
    errorContainer.innerHTML = `<h2>Error: ${message}</h2>`;
  }

  function createHtml(details) {
    const detailPosts = document.getElementById("post-details");

    detailPosts.innerHTML = `<div class="contentPost">
                                <h2>${details.title.rendered}</h2>
                                <div>${details.content.rendered}</div>
                                <div>${details.excerpt.rendered}</div>
                              </div>`;
    document.title = details.title.rendered;
}
}