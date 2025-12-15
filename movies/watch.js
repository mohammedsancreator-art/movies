const API_KEY = "b60c2e6068f64d1b4445fc3133be45ad";
const BASE_URL = "https://api.themoviedb.org/3";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

async function loadMovie() {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
  const data = await res.json();

  const video = data.results.find(v => v.site === "YouTube");
  if (!video) return alert("Video not available");

  document.getElementById("player").src =
    `https://www.youtube.com/embed/${video.key}`;
}

loadMovie();
