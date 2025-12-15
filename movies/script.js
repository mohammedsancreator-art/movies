const API_KEY = "b60c2e6068f64d1b4445fc3133be45ad";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const moviesContainer = document.getElementById("moviesContainer");
const searchInput = document.getElementById("searchInput");

async function fetchMovies(query = "") {
  const url = query
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  displayMovies(data.results);
}

function displayMovies(movies) {
  moviesContainer.innerHTML = "";

  movies.forEach(movie => {
    if (!movie.poster_path) return;

    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <img src="${IMG_URL + movie.poster_path}">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <span>⭐ ${movie.vote_average}</span>

        <div class="movie-buttons">
          <button class="trailer-btn">Trailer</button>
          <button class="watch-btn">Watch</button>
        </div>
      </div>
    `;

    card.querySelector(".trailer-btn").onclick = () => openTrailer(movie.id);
    card.querySelector(".watch-btn").onclick = () => {
      window.location.href = `watch.html?id=${movie.id}`;
    };

    moviesContainer.appendChild(card);
  });
}

async function openTrailer(movieId) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
  const data = await res.json();

  const trailer = data.results.find(v => v.type === "Trailer");
  if (!trailer) return alert("Trailer not available");

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <div class="close-btn">✖</div>
      <iframe src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen></iframe>
    </div>
  `;

  modal.querySelector(".close-btn").onclick = () => modal.remove();
  document.body.appendChild(modal);
}

searchInput.addEventListener("keyup", e => fetchMovies(e.target.value));
fetchMovies();
