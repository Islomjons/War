let moviesArray = movies.slice(0, 50);

let elWrapper = document.querySelector(".movie__wrapper");
let elForm = document.querySelector("#form");
let elInputYear = document.querySelector(".form__year");
let elInputRating = document.querySelector("#form__rating");
let elInputCategory = document.querySelector(".form__category");
let elInputSort = document.querySelector(".form__sorting");
let elResult = document.querySelector(".result__number");
let elMoviesTemplate = document.querySelector("#movies__card").content;


// Normalize
let normalizedMovies = moviesArray.map(function(item) {
    return {
        title: item.Title.toString(),
        categories: item.Categories.split("|"),
        info: item.summary,
        img: `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`,
        videoUrl: `https://www.youtube.com/watch?v=${item.ytid}`,
        rating: item.imdb_rating,
        year: item.movie_year,
    }
});


// Categories
function takeCategories(array) {
    let newArray = [];

    array.forEach(item => {
        let oneMovieCategory = item.categories;
        oneMovieCategory.forEach(function(item1) {
            
            if(!newArray.includes(item1)){
                newArray.push(item1)
            }
        })
    });

    return newArray
}
let categoryArray = takeCategories(normalizedMovies).sort();

function renderCategories(array, wrapper) {
    let fragment = document.createDocumentFragment();
    for (const item of array) {
        let newOption = document.createElement("option");
        newOption.textContent = item;
        newOption.value = item;
        fragment.appendChild(newOption);
    }
    wrapper.appendChild(fragment)
}

renderCategories(categoryArray, elInputCategory)


function renderMovies(array, wrapper) {
    wrapper.innerHTML = null;
    elResult.textContent = array.length;

    let fragment = document.createDocumentFragment();

    for (const item of array) {
        let moviesTemplate = elMoviesTemplate.cloneNode(true);
        
        moviesTemplate.querySelector(".movie__img").src = item.img;
        moviesTemplate.querySelector(".movies__title").textContent = item.title;
        moviesTemplate.querySelector(".movies__year").textContent = item.year;
        moviesTemplate.querySelector(".movies__rating").textContent = item.rating;
        moviesTemplate.querySelector(".categories").textContent = item.categories;
        moviesTemplate.querySelector(".movies__url").href = item.videoUrl;

        fragment.appendChild(moviesTemplate)
    }

    wrapper.appendChild(fragment)
}
renderMovies(normalizedMovies, elWrapper);


elForm.addEventListener("submit", function(event){
    event.preventDefault();

    let inputYear = elInputYear.value.trim();
    let inputSort = elInputSort.value.trim();
    let inputCategory = elInputCategory.value.trim();
    let inputRating = elInputRating.value.trim();

    let filteredArray = normalizedMovies.filter(function(item) {
        let isTrue = true

        if(inputCategory == "all"){
            isTrue = true
        }else{
            isTrue = item.categories.includes(inputCategory)
        }

        let ganeral = item.year >= inputYear && item.rating >= inputRating && isTrue
        return ganeral;
    })

    if(inputSort == "rating__high-low"){
        filteredArray.sort((a, b) => {
            return b.rating - a.rating
        })
    }

    if(inputSort == "rating__low-high"){
        filteredArray.sort((a, b) => {
            return a.rating - b.rating
        })
    }

    if(inputSort == "year__high-low"){
        filteredArray.sort((a, b) => {
            return b.year - a.year
        })
    }

    if(inputSort == "year__low-high"){
        filteredArray.sort((a, b) => {
            return a.year - b.year
        })
    }
   
    renderMovies(filteredArray, elWrapper)
})
