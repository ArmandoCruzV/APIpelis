searchFormBtn.addEventListener('click', () => {
    location.hash = '#search='+ searchFormInput.value;
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {
    //Te muestra la url anterior
    history.back();
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator,false);


function navigator(){
    console.log({ location })

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    }else if (location.hash.startsWith('#search=')) {
        searchPage();
    }else if (location.hash.startsWith('#movie=')) {
        movieDetailPage();
    }else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    }else {
        homePage();
    }

    //No en toos los navegadores funciona el scrollTop
    document.body.scrollTop = 0;
    //Es necesario usar para safary
    document.documentElement.scrollTop = 0;
}

function homePage(){
    console.log('Home');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    genericSection.style.display = 'none';

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    arrowBtn.style.display = 'none';

    getTrendingAllPreview();
    getCategoriesAllPreview();
}

function trendsPage(){
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    
    trendingPreviewSection.style.display = 'none';
    categoriesPreviewSection.style.display = 'none';
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias';
    getTrendingMovies();
}

function searchPage(){
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.style.display = 'none';
    categoriesPreviewSection.style.display = 'none';
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
}

function movieDetailPage(){
    headerSection.classList.add('header-container--long');
    headerSection.style.background = '';
    headerSection.style.height = '100vh';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    genericSection.style.display = 'none';
    trendingPreviewSection.style.display = 'none';
    categoriesPreviewSection.style.display = 'none';
    movieDetailCategories.style.display = 'grid';
   // relatedMoviesContainer.style.display = 'flex';

    trendingPreviewSection.style.display = 'none';
    categoriesPreviewSection.style._display = 'none';

    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId);
}

function categoriesPage(){

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.style.display = 'none';
    categoriesPreviewSection.style.display = 'none';
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=');
    const [categoryId,categoryName] = categoryData.split('-'); 

    headerCategoryTitle.innerHTML = categoryName;

    getMoviesByCategory(categoryId);
}