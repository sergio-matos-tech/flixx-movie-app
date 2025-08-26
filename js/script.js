const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    // Register your key at https://www.themoviedb.org/settings/api and enter here
    // Only use this for development or very small projects. You should store your key and make requests from a server
    apiKey: 'e168671b32408f28473fafdcc8b8460a',
    apiUrl: 'https://api.themoviedb.org/3/',
  },
};

async function displayPopularMovies() {
  const { results } = await fetchAPIdataFromTMDB('movie/top_rated');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
            <p class="card-text">
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
          </div>
        `;

    document.querySelector('#popular-movies').appendChild(div);
  });
}

async function fetchAPIdataFromTMDB(endpoint) {
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

    const data = await response.json();
    
    return data;
}

function hightlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
}

function initApp() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/shows.html':
            console.log('"SHOWS PAGE"');
            break;
        case '/movie-details.html':
            console.log('"MOVIE DETAILS PAGE"');
            break;
        case '/tv-details.html':
            console.log('"TV DETAILS PAGE"');
            break;
        case '/search.html':
            console.log('"SEARCH PAGE"');
            break;
        default:
            console.log('404 PAGE NOT FOUND');
            break;
    }     
    
    hightlightActiveLink();
}

document.addEventListener('DOMContentLoaded', initApp);