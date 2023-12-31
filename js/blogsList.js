const url = "https://www.weronkakarczmarczyk.no/wp-json/wp/v2/posts";
    const detailContainer = document.getElementById("results");
    const loadingIndicator = document.getElementById("loading-indicator");
    const seeMoreButton = document.getElementById("see-more");

    let page = 1;

    function showError(message) {
      const errorContainer = document.getElementById("results");
      errorContainer.innerHTML = `<h2>Error: ${message}</h2>`;
    }

    async function fetchPosts() {
      try {
        loadingIndicator.style.display = "block";

        const response = await fetch(url + `?page=${page}`);
        if (!response.ok) {
          throw new Error('More travels soon...');
        }

        const posts = await response.json();

        for (const post of posts) {
          const postDate = new Date(post.date);
          const formattedDate = postDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

          detailContainer.innerHTML += `<a href="specific-post.html?id=${post.id}" class="card">
                                          <h2>${post.title.rendered}</h2>
                                          <h3>${formattedDate}</h3>
                                          <h4>${post.better_featured_image.alt_text}</h4>
                                          <img src="${post.better_featured_image.source_url}">
                                          </a>`;
        }
        page++;
      } catch (error) {
        showError(error.message);
      } finally {
        loadingIndicator.style.display = "none";
      }
    }

    function loadMorePosts() {
      fetchPosts();
    }

    seeMoreButton.addEventListener('click', loadMorePosts);

    fetchPosts();