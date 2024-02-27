const accesskey = "TGIDD52Rnio4XJFCgJQLX5BHBw75M0hDESej8S6FYD0";

const formEl = document.querySelector("form");
const inputEl = document.querySelector("#search-input");
const searchResults = document.querySelector(".search-result");
const showMore = document.querySelector("#show-more");

let inputData = "";
let page = 1;

 async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();

    const result = data.results;

    if(page === 1){
        searchResults.innerHTML = "";

    }

    result.map((result) =>{
        const imageWrapper =document.createElement("div");
        imageWrapper.classList.add("serach-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href  =result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);


    });

    page++;
    if(page > 1){
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit",(event) =>{
    event.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click",() =>{
   
    searchImages();
});