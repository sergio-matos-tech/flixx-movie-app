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

async function displayTVSlider() {
  const { results } = await fetchAPIdataFromTMDB('tv/on_the_air');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `
      <a href="tv-details.html?id=${show.id}">
        <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${show.vote_average.toFixed(1)} / 10
      </h4>
    `;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
}

async function displaySlider() {
  const { results } = await fetchAPIdataFromTMDB('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>
    `;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
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

function displayBackgroundImage(type, backgroundPath) {

  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

function addCommasToNumber(number) {

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

async function displayShowDetails() {
  const showId = window.location.search.split('=')[1];

  const show = await fetchAPIdataFromTMDB(`tv/${showId}`);

  displayBackgroundImage('tv', show.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
    <div class="details-top">
    <div>
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
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${
        show.homepage
      }" target="_blank" class="btn">Visit show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number of Episodes:</span> ${
        show.number_of_episodes
      }</li>
      <li><span class="text-secondary">Last Episode To Air:</span> ${
        show.last_episode_to_air.name
      }</li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
      ${show.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(', ')}
    </div>
  </div>
    `;

  document.querySelector('#show-details').appendChild(div);
}

async function displayMovieDetails() {
    const movieId = window.location.search.split('=')[1];

    const movie = await fetchAPIdataFromTMDB(`movie/${movieId}`);

    displayBackgroundImage('movie', movie.backdrop_path);

    const div = document.createElement('div');

    div.innerHTML = `
    <div class="details-top">
    <div>
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
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${
        movie.homepage
      }" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
        movie.budget
      )}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
        movie.revenue
      )}</li>
      <li><span class="text-secondary">Runtime:</span> ${
        movie.runtime
      } minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
      ${movie.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(', ')}
    </div>
  </div>
    `;

  document.querySelector('#movie-details').appendChild(div);
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
            displaySlider();
            displayMovies('movie/popular');
            setupFilterButtons();
      break;
        case '/shows.html':
          displayTVSlider()
          displayTvShows('tv/popular');
          setupTvShowFilterButtons(); 
          break;
        case '/movie-details.html':
            displayMovieDetails();
            break;
        case '/tv-details.html':
            displayShowDetails();
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