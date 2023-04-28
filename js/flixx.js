const pathName ={
    currentPage: window.location.pathname,
};



//Highlight Active Link

function highlightActiveLink(){
    const  navLink = document.querySelectorAll(".nav-link");
    navLink.forEach((link) => {
        if (link.getAttribute('href') === pathName.currentPage) {
            link.classList.add('active')
        }
    })
}

// Creating Elements For Movies
function createElementForMovies(movie) {
    const lastContainerDiv = document.querySelector('.lastContainer');

    const divPopularMovies = document.createElement('div');
    divPopularMovies.className = 'grid';
    divPopularMovies.id = 'popular-movies';
    
    const divCard = document.createElement('div');
    divCard.className = 'card';
    
    const movieLink = document.createElement('a');
    movieLink.href = `movie-details.html?id=1${movie.id}`;
    // Image
    const cardImg = document.createElement('img');
    cardImg.className = 'card-img-top'
    if (!movie.poster_path ) {
        cardImg.src = "images/no-image.jpg"
    } else {
        cardImg.src = `https://image.tmdb.org/t/p/w780${movie.poster_path}`
    }

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    const h5CardTitle = document.createElement('h5');
    h5CardTitle.className = 'card-title';
    h5CardTitle.innerText = `${movie.title}`;
   
    const pCardText = document.createElement('p');
    pCardText.className = 'card-text';
    
    const smallTextMuted = document.createElement('small');
    smallTextMuted.className = 'text-muted';
    smallTextMuted.innerText = `Release: ${movie.release_date}`


    lastContainerDiv.appendChild(divPopularMovies);
    divPopularMovies.appendChild(divCard);
    divCard.appendChild(movieLink);
    movieLink.appendChild(cardImg);

    divPopularMovies.appendChild(cardBody);
    cardBody.appendChild(h5CardTitle);
    cardBody.appendChild(pCardText);
    pCardText.appendChild(smallTextMuted);
}
// Creating Elements For Shows
function createElementForShows(shows){
    const lastContainerDiv = document.querySelector('#lastContainerShows');

    const divPopularMovies = document.createElement('div');
    divPopularMovies.className = 'grid';
    divPopularMovies.id = 'popular-movies';
    
    const divCard = document.createElement('div');
    divCard.className = 'card';
    
    const movieLink = document.createElement('a');
    movieLink.href = `show.html?id=1${shows.id}`;
    // Image
    const cardImg = document.createElement('img');
    cardImg.className = 'card-img-top'
    if (!shows.poster_path ) {
        cardImg.src = "images/no-image.jpg"
    } else {
        cardImg.src = `https://image.tmdb.org/t/p/w780${shows.poster_path}`
    }

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    const h5CardTitle = document.createElement('h5');
    h5CardTitle.className = 'card-title';
    h5CardTitle.innerText = `${shows.name}`;
   
    const pCardText = document.createElement('p');
    pCardText.className = 'card-text';
    
    const smallTextMuted = document.createElement('small');
    smallTextMuted.className = 'text-muted';
    smallTextMuted.innerText = `Release: ${shows.first_air_date}`


    lastContainerDiv.appendChild(divPopularMovies);
    divPopularMovies.appendChild(divCard);
    divCard.appendChild(movieLink);
    movieLink.appendChild(cardImg);

    divPopularMovies.appendChild(cardBody);
    cardBody.appendChild(h5CardTitle);
    cardBody.appendChild(pCardText);
    pCardText.appendChild(smallTextMuted);
}



//Display Movie Details
function onClickMovieDetails(){}



//Fetch Data from T-MDB API
async function fetchAPIData(endpoint){
    const API_KEY = 'YOUR_API_KEY';
    const API_URL = 'https://api.themoviedb.org/3/'

    const res = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)
    const data = await res.json();

    return data;
}


// Fetching PopularMovies
async function displayPopularMovies() {
    const {results} = await fetchAPIData('/movie/popular');
    console.log(results);
    results.forEach((movie) =>  { 
          createElementForMovies(movie)
    })
    

}

// Fetching TV-Shows
async function displayPopularShows() {
    const {results} = await fetchAPIData('/tv/popular');
    console.log(results);
    results.forEach((shows) =>  { 
          createElementForShows(shows)
    })
    
}

// Displaying Movie Details
async function displayMovieDetails(){
    const movieId = window.location.search.split('=')[1].slice(1);
    
    const movie = await fetchAPIData(`movie/${movieId}`);
    
    const container = document.querySelector('.container-movieDet');

    const divMovieImg = document.createElement('div');
    divMovieImg.className = 'movie-image';
    const imgMov = document.createElement('img');
    imgMov.className = 'card-img-top';
    imgMov.alt = 'Movie Title'
    if (!movie.poster_path ) {
        imgMov.src = "images/no-image.jpg"
    } else {
        imgMov.src = `https://image.tmdb.org/t/p/w780${movie.poster_path}`
    }

    const movieZoom = document.createElement('div');
    movieZoom.className = 'movie-zoomDet';
    const h1MovieTitle = document.createElement('h1');
    h1MovieTitle.innerText = movie.title
    const p1Star = document.createElement('p')
    p1Star.innerHTML = `<p>
                       <i class="fa-solid fa-star" 
                       style="color: #ffde05;">
                       </i> ${movie.vote_average.toFixed(1)}/10</p>
                       `;
    const p2Overview = document.createElement('p');
    p2Overview.innerText = movie.overview;
    const lDiv = document.createElement('div');
    const ulList = document.createElement('ul');
    ulList.className = 'listOfCategories';

    const li = document.createElement('li');
    li.innerHTML = `<li style=" line-height: 20px;"><h5 style=" color: rgb(238, 215, 12); margin: 0px; padding: 0px;">Genre</h5>${movie.genres.map((genre) => `<li style=" line-height: 20px;">${genre.name}</li>` ).join('')}</li>`;

    const btnMovieDet = document.createElement('button');
    btnMovieDet.className = 'btnMovieDet'
    btnMovieDet.innerText = 'Visit Movie Home Page'
    container.appendChild(divMovieImg);
    divMovieImg.appendChild(imgMov);

    container.appendChild(movieZoom);
    movieZoom.appendChild(h1MovieTitle);
    movieZoom.appendChild(p1Star);
    movieZoom.appendChild(p2Overview);
    movieZoom.appendChild(lDiv);
    lDiv.appendChild(ulList);
    ulList.appendChild(li);
    lDiv.appendChild(btnMovieDet)

}



// Init App
function init() { 

switch (pathName.currentPage) {
    case '/':
    case '/index.html':
        displayPopularMovies();
        break;
    case '/movie-details.html':
        console.log("Movie Details")
        displayMovieDetails();
        break;
    case '/shows.html': 
        displayPopularShows();
        break;
    case '/tv-details.html':
        console.log("TV Details")
        break;
    case '/movie-details.html':
        console.log("moviesDetails")
        break;
    case '/search.html':
         console.log("search.html")
         break;
    default:
        break;
     }

     highlightActiveLink();

}




document.addEventListener('DOMContentLoaded', init);
