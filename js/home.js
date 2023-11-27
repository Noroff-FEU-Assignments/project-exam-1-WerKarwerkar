const initialSlider = document.querySelector('.slider');
const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');

let sectionIndex = 0;

leftArrow.addEventListener('click', function() {
    sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 0;
    initialSlider.style.transform = 'translate(' + (sectionIndex * -25) + '%)';
});

rightArrow.addEventListener('click', function() {
    sectionIndex = (sectionIndex < 2) ? sectionIndex + 1 : 0;
    initialSlider.style.transform = 'translate(' + (sectionIndex * -25) + '%)';
});

async function fetchData() {
    const url = "https://www.weronkakarczmarczyk.no/wp-json/wp/v2/posts?per_page=4&order=desc";

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching the posts:', error);
    }
}

async function updateCarousel() {
    const postData = await fetchData();
    const postSections = postData.map(post => {
        return `<section>
           <div class="latest-posts">
             <a href="specific-post.html?id=${post.id}"&title=${post.title.rendered}">
               <img src="${post.better_featured_image.source_url}" alt="${post.better_featured_image.source_url}" class="box"/>
             </a>
             <div>
               <p>${post.title.rendered}</p>
               <h2><a href="html/specific-post.html?id=${post.id}&title=${post.title.rendered}"></a></h2>
             </div>
           </div>
         </section>`;
    });

    initialSlider.innerHTML = postSections.join('');

    sectionIndex = 0;
}

updateCarousel();