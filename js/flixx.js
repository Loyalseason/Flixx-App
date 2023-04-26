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

//Fetch Data from T-MDB API
async function fetchAPIData(endpoint){
    const API_KEY = '4ea990b991a8a8f55c0afd95a62d3eec';
    const API_URL = 'https://api.themoviedb.org/3/'

    const res = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)
    const data = await res.json();

    return data;
}



async function displayPopularMovies() {
    const {results} = await fetchAPIData('/movie/popular');
    console.log(results);
    results.forEach((movie) =>  { 
          createElementForMovies(movie)
    })
    

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
        break;
    case 'shows.html': 
        console.log("Shows")
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
