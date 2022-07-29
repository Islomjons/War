let moviesArray = movies.slice(0, 50);

let elBtn = document.querySelector("#btn__form");
let elInput = document.querySelector("#input__form");
let elMovieWrapper = document.querySelector(".movie__wrapper");
let elMoviesCard = document.querySelector("#movies__card").content;

function normalize(array) {
    let newArray = [];
    array.forEach(item => {
        let newObject = {};
        newObject.title = item.Title.toString();
        newObject.videoUrl = `https://www.youtube.com/watch?v=${item.ytid}`;
        newObject.categories = item.Categories.split("|")
        newObject.movieYear = item.movie_year;
        newObject.imdbRating = item.imdb_rating;
        newObject.img = `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`;
        newArray.push(newObject)
    });
    return newArray
}


let newArray = normalize(moviesArray);

function renderMovies(array, wrapper) {
    wrapper.innerHTML = null
    
    let tempFragment = document.createDocumentFragment();
    for (let item of array) {
            let templateItem = elMoviesCard.cloneNode(true)
            templateItem.querySelector(".movie__img").src = item.img;
            templateItem.querySelector(".movies__title").textContent = item.title;
            templateItem.querySelector(".movies__year").textContent = item.movieYear;
            templateItem.querySelector(".movies__rating").textContent = item.imdbRating;
            templateItem.querySelector(".movies__url").href = item.videoUrl;
            templateItem.querySelector(".movies__url").target = "_blank"
            
            tempFragment.appendChild(templateItem);
    }
    wrapper.appendChild(tempFragment);
}

renderMovies(newArray, elMovieWrapper);

let elForm = document.querySelector("#form");
elForm.addEventListener("submit", function(event){
    event.preventDefault();
    let elInput = Number(document.querySelector("#input__form").value.trim());
    let findArray = [];
    for (let i = 0; i < newArray.length; i++) {
        if (elInput <= newArray[i].imdbRating){
            findArray.push(newArray[i])
        }
    }
    renderMovies(findArray, elMovieWrapper);
});