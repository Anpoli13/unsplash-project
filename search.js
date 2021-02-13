const formTag = document.querySelector("form");
const inputTag = formTag.querySelector("input");
const resultsTag = document.querySelector("section.results");

const accessKey = "0rmSv6_FC9DiOGM_l3G2YOvxXDm9QOinwRfjovLKnzg";
const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query=";

const searchUnsplash = function(term) {
    return fetch(apiUrl + term, {
        method: "GET",
        headers: {
            "Authorization": "Client-ID " + accessKey,
        }
    })
        .then(response => response.json())
        .then(data => {
             console.log(data)
            // format unsplash's results to suit our needs
            return data.results.map(result => {
                return {
                    imageSrc: result.urls.regular,
                    width: result.width,
                    height: result.height,
                    name: result.user.name,
                    title: (result.description || "Untitled"),
                    backgroundColor: (result.color || "#eeeeee") + "33"
                }
            })
        })
}

// add resukts to the page
const addResults = function(results) {
    //remove all the loading tags
    resultsTag.innerHTML = "";

    // loop over each individual results and add to the results
    results.forEach(result => {
        resultsTag.innerHTML = resultsTag.innerHTML + `
        <div class="single-result">
            <div class="image" style="background-color: ${result.backgroundColor}">
                <img src="${result.imageSrc}">
            </div>
            <h2>${result.title}</h2>
            <p>by ${result.name} - ${result.width} x ${result.height}</p>
        </div>
        `
    })
}

// when we submit the form, get the info from input

formTag.addEventListener("submit", function(e) {
    //get the info from input
    const searchTerm = inputTag.value;

    searchUnsplash(searchTerm)
        .then(results => {
            addResults(results);
        });

    // stop form going to the usual nex page
    e.preventDefault()
})