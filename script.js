const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = "5360d3bb6ad9404c61df084428554ac3";
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

const moviesGrid = document.getElementById("movies-grid");
const searchInput = document.getElementById("search-input");

const searchForm = document.getElementById("search-form");
const categoryTitle = document.getElementById("category-title");

function reloadPage() {
  location.reload();
}

async function fetchMoviesNowPlaying() {
  const response = await fetch(
    `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`
  );
  const jsonResponse = await response.json();
  const movies = jsonResponse.results;

  displayMovies(movies);
}

async function searchMovies(query) {
  const response = await fetch(
    `${apiBaseUrl}/search/movie?api_key=${apiKey}&query="${query}"`
  );
  const jsonResponse = await response.json();
  const movies = jsonResponse.results;

  displayMovies(movies);
}

function displayMovies(movies) {
  moviesGrid.innerHTML = movies
    .map(
      (movie) =>
        `<div class="movie-card">
        <img src="${
          movie.poster_path
            ? imageBaseUrl + movie.poster_path
            : "http://via.placeholder.com/1080x1580"
        }"/>
        <p>⭐${movie.vote_average.toFixed(1)}</p>
        <h1>${movie.title}</h1>
        <button onclick="goToMovieDetails('${
          movie.id
        }')" class="Detail">Movie details</button>
    </div>`
    )
    .join("");
}

function handleSearchFormSubmit(event) {
  categoryTitle.innerHTML = "Search Results";
  const IsItValued = searchInput.value;
  event.preventDefault();
  const searchQuery = searchInput.value;

  if (IsItValued) {
    searchMovies(searchQuery);
  } else {
    reloadPage();
  }
}

searchForm.addEventListener("submit", handleSearchFormSubmit);
fetchMoviesNowPlaying();

function fetchMovieCredits(movieId) {
  const url = `${apiBaseUrl}/movie/${movieId}/credits?api_key=${apiKey}`;
  return fetch(url)
    .then((response) => response.json())
    .then((credits) => {
      return credits.cast.slice(0, 8).map((actor) => actor.name);
    })
    .catch((error) => console.log(error));
}

window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 75 || document.documentElement.scrollTop > 75) {
    document.getElementById("scroll-to-top-button").style.display = "block";
  } else {
    document.getElementById("scroll-to-top-button").style.display = "none";
  }
}
var scrollButton = document.getElementById("scroll-to-top-button");
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 850) {
    scrollButton.classList.add("show");
  } else {
    scrollButton.classList.remove("show");
  }
});

document
  .getElementById("scroll-to-top-button")
  .addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
function goToMovieDetails(movieId) {
  const url = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`;
  fetch(url)
    .then((response) => response.json())
    .then((movie) => {
      return fetchMovieCredits(movieId).then((actors) => {
        const movieDetails = document.createElement("div");
        movieDetails.innerHTML = `
        <div class ="grid">
          <div class="div1">
            <h1 class="style">
              <img src="${
                movie.poster_path
                  ? imageBaseUrl + movie.poster_path
                  : "http://via.placeholder.com/1080x1580"
              }" class = "style"/>
            </h1>
          </div>
          <div class="div2">
            <h3 class ="style">
              ${movie.title}
              <button onclick="window.location.href = 'index.html';" class="return">✖</button>
            </h3>
            <h3 class ="style">⭐ ${movie.vote_average.toFixed(1)}</h3>
            <p class="style">${movie.overview}</p> 
            <p class="style"><b>Cast:</b> <i>${actors.join(", ")}</i></p>
            <p class="style"><b>Release Date:</b><i> ${
              movie.release_date
            }</i></p>
            <p class="style"><b>Genre:</b> <i>${movie.genres
              .map((genre) => genre.name)
              .join(", ")}</i></p>
          </div>
          <div class="div3">
            <iframe
              src="https://www.youtube.com/embed/${
                movie.videos.results[0].key
              }" class="iframe"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      `;
        const page1Body = document.querySelector("body");
        page1Body.innerHTML = "";
        page1Body.appendChild(movieDetails);
      });
    })
    .catch((error) => console.log(error));
}

document.addEventListener("DOMContentLoaded", function () {
  const btn1 = document.querySelector(".btn-1");
  const listOf = document.querySelector(".list-of");

  const functionOnCklick = function () {
    listOf.classList.toggle("show");
  };

  btn1.addEventListener("click", functionOnCklick);
});

document.addEventListener("DOMContentLoaded", function () {
  const genreTag = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

  const listItems = document.querySelector(".list-items");
  genreTag.map(function (tag) {
    const item = document.createElement("div");
    item.classList.add("list-item");
    item.dataset.genreId = tag.id;
    item.textContent = tag.name;
    listItems.appendChild(item);
  });

  let selectedGenres = [];
  const filterButtons = document.querySelectorAll(".list-item");
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const genreId = button.dataset.genreId;
      const genreIndex = selectedGenres.indexOf(genreId);
      if (genreIndex > -1) {
        selectedGenres.splice(genreIndex, 1);
        console.log(selectedGenres);
      } else {
        selectedGenres.push(genreId);
        console.log(selectedGenres);
      }
      function displayMoviesByGenres(selectedGenres) {
        if (selectedGenres.length > 0) {
          moviesGrid.innerHTML = "";
          fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenres.join(
              ","
            )}`
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              const movies = data.results;
              if (movies.length > 0) {
                movies.forEach(function (movie) {
                  moviesGrid.innerHTML += `<div class="movie-card">
                    <img src="${
                      movie.poster_path
                        ? imageBaseUrl + movie.poster_path
                        : "http://via.placeholder.com/1080x1580"
                    }"/>
                    <p>⭐${movie.vote_average.toFixed(1)}</p>
                    <h1>${movie.title}</h1>
                    <button onclick="goToMovieDetails('${
                      movie.id
                    }')" class="Detail">Movie details</button>
                  </div>`;
                });
              } else {
                moviesGrid.innerHTML = "<p>No movies found.</p>";
              }
            })
            .catch(function (error) {
              console.error(error);
            });
        } else {
          reloadPage();
        }
      }
      displayMoviesByGenres(selectedGenres);
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".list-item");

  function changeColor(event) {
    const element = event.target;
    const currentColor = element.style.backgroundColor;
    const newColor = currentColor === "orange" ? "" : "orange";
    element.style.backgroundColor = newColor;
  }

  function changeTextColor(event) {
    const element1 = event.target;
    const currentColor1 = element1.style.color;
    const newColor1 = currentColor1 == "black" ? "" : "black";
    element1.style.color = newColor1;
  }

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", changeColor);
    buttons[i].addEventListener("click", changeTextColor);
  }
});
