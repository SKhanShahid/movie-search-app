// Replace this with your actual API key from TMDb
const apiKey = "ddaca4492446a1378312547a497c35ea";
const apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=";
const moviePosterBaseUrl = "https://image.tmdb.org/t/p/w500";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const movieList = document.getElementById("movie-list");
const loadingIndicator = document.getElementById("loading");

// Function to fetch movie data from the API
async function fetchMovies(query) {
    movieList.innerHTML = "";
    loadingIndicator.style.display = "block"; // Show loading message

    try {
        const response = await fetch(`${apiUrl}${apiKey}&query=${query}`);
        const data = await response.json();

        loadingIndicator.style.display = "none"; // Hide loading message

        if (data.results.length === 0) {
            movieList.innerHTML = "<p>No movies found. Please try a different search.</p>";
            return;
        }
        
        displayMovies(data.results);

    } catch (error) {
        console.error("Error fetching movie data:", error);
        loadingIndicator.style.display = "none"; // Hide loading message even on error
        movieList.innerHTML = "<p>An error occurred. Please try again later.</p>";
    }
}

// Function to display movies on the page
function displayMovies(movies) {
    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        const posterUrl = movie.poster_path ? `${moviePosterBaseUrl}${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image";

        movieCard.innerHTML = `
            <img src="${posterUrl}" alt="${movie.title} Poster">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>Rating: ${movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
                <p class="overview">${movie.overview ? movie.overview.substring(0, 150) + "..." : "No overview available."}</p>
            </div>
        `;

        movieList.appendChild(movieCard);
    });
}

// Event listener for the search button
searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    if (query.trim() !== "") {
        fetchMovies(query);
    }
});

// Event listener for the "Enter" key on the search input
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const query = searchInput.value;
        if (query.trim() !== "") {
            fetchMovies(query);
        }
    }
});