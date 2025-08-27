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

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

async function displayMovies(category) {
  document.querySelector('#popular-movies').innerHTML = '';

  const { results } = await fetchAPIdataFromTMDB(category);

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
      </div>
    `;

    document.querySelector('#popular-movies').appendChild(div);
  });
}

async function displayTvShows(category) {
  document.querySelector('#popular-shows').innerHTML = '';

  const { results } = await fetchAPIdataFromTMDB(category);

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="tv-details.html?id=${show.id}">
        ${
          show.poster_path
            ? `<img
          src="https://image.tmdb.org/t/p/w500${show.poster_path}"
          class="card-img-top"
          alt="${show.name}"
        />`
            : `<img
        src="../images/no-image.jpg"
        class="card-img-top"
        alt="${show.name}"
      />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">First Aired: ${show.first_air_date}</small>
        </p>
      </div>
    `;

    document.querySelector('#popular-shows').appendChild(div);
  });
}

function setupTvShowFilterButtons() {
  const filterButtons = document.querySelectorAll('#filter-buttons .btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));

      button.classList.add('active');

      const category = button.getAttribute('data-category');
      displayTvShows(category);
    });
  });
}

function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('#filter-buttons .btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      button.classList.add('active');
      
      const category = button.getAttribute('data-category');
      displayMovies(category);
    });
  });
}

async function fetchAPIdataFromTMDB(endpoint) {
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

    showSpinner();

    const data = await response.json();

    hideSpinner();
    
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
            displayMovies('movie/popular');
            setupFilterButtons();
      break;
        case '/shows.html':
            displayTvShows('tv/popular');
            setupTvShowFilterButtons(); 
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