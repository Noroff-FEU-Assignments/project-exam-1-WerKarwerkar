const loadingIndicator = document.getElementById("loading-indicator");
const detailPosts = document.getElementById("post-details");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const modal = document.getElementById("myModal");
const modalContent = document.getElementById("modal-content");

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
                                <h3>${details.content.rendered}</h3>
                              </div>`;
    document.title = details.title.rendered;

    const createModal = detailPosts.querySelectorAll(".wp-block-image");

    createModal.forEach((imageWp) => {
      const getWpImg = imageWp.innerHTML;
      imageWp.addEventListener("click", () => {
        modalContent.innerHTML = `<div class="contentPost">${getWpImg}</div>`;
        modal.showModal();
      });
    });

    modal.addEventListener("click", () => {
      modal.close();
    });
  }
}