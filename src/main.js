const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-type': 'application/json;charset=UTF-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

//Utils
function createMovies(movies, container){
    container.innerHTML = '';

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-image');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300'+ movie.poster_path);
        
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function createCategories(categories, container){
    container.innerHTML = '';

    categories.forEach(category => {

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id'+category.id);
        const categoryTitleText = document.createTextNode(category.name);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}


// Llamados a la API
async function getTrendingAllPreview(){
    const { data } = await api('trending/all/day');
    const movies = data.results;

    createMovies(movies,trendingMoviesPreviewList);
}

async function getCategoriesAllPreview(){
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    createCategories(categories, categoriesPreviewList);
} 

async function getMoviesByCategory(id){
    const { data } = await api('discover/movie',{
        params: { 
            with_genres: id,
        },
    });
    const movies = data.results;

    createMovies(movies,genericSection);
}

async function getMoviesBySearch(query){
    const { data } = await api('search/movie',{
        params: { 
            query,
        },
    });
    const movies = data.results;

    createMovies(movies,genericSection);
}

async function getTrendingMovies(){
    const { data } = await api('trending/all/day');
    const movies = data.results;

    createMovies(movies, genericSection);
}

async function getMovieById(id){
    const { data: movie } = await api('movie/' + id);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    headerSection.style.background = `url(${movieImgUrl})`;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList);

    getRelateMoviesId(id);
}

async function getRelateMoviesId(id){
    const { data } = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;

    createMovies(relatedMovies,relatedMoviesContainer);
}
