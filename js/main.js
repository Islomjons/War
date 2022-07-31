let moviesArray = movies.slice(0, 50);

let elBtn = document.querySelector("#btn__form");
let elInput = document.querySelector("#input__form");
let elSpan = document.querySelector(".result__number");
let elSelectCategory = document.querySelector(".select__category")
let elMovieWrapper = document.querySelector(".movie__wrapper");
let elMoviesCard = document.querySelector("#movies__card").content;


let newArray = moviesArray.map(function(item) {
    return {
        title: item.Title.toString(),
        videoUrl: `https://www.youtube.com/watch?v=${item.ytid}`,
        categories: item.Categories.split("|"),
        movieYear: item.movie_year,
        imdbRating: item.imdb_rating,
        img: `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`,
    }
});


function getCategory(array) {

    let categoriesArray = [];

    for (const item of newArray) {
        for (const itemCategory of item.categories) {
            if(!categoriesArray.includes(itemCategory)){
                categoriesArray.push(itemCategory)
            }
        }
    }

    return categoriesArray
}

let moviesCategory = getCategory(newArray);
function renderCatagory(array, notion) {
    notion.innerHTML = null;
    
    let tempFragment = document.createDocumentFragment();

    let newOption = document.createElement("option");
    for (const item of array) {
        let newOption = document.createElement("option");
        newOption.textContent = item;
        newOption.value = item
        
        tempFragment.appendChild(newOption)
    }
    notion.appendChild(tempFragment)
}

renderCatagory(moviesCategory, elSelectCategory)


function renderMovies(array, wrapper) {
    wrapper.innerHTML = null;
    elSpan.textContent = array.length
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

elSelectCategory.addEventListener("input", function(event){
    event.preventDefault();

    let selectCategory = elSelectCategory.value;
    
    let filteredArray = newArray.filter(function (item) {
        return item.categories.includes(selectCategory);
    })

    if(selectCategory !="all") {
        renderMovies(filteredArray, elMovieWrapper)
    }else{
        renderMovies(newArray, elMovieWrapper)
    }
})




let elForm = document.querySelector("#form");
elForm.addEventListener("submit", function(event){
    event.preventDefault();
    let elInput = Number(document.querySelector("#input__form").value.trim());
    let findArray = [];
    for (let i = 0; i < newArray.length; i++) {
        if (elInput <= newArray[i].imdbRating){
            findArray.push(newArray[i]);
        }
    }
    renderMovies(findArray, elMovieWrapper);
})