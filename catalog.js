let url = "https://openlibrary.org/subjects/"
let coverUrl = "https://covers.openlibrary.org/b/id/"

let sampleSubject = ['manga','sci+fi',"adventure","history",'travel',"romance","fitness","biography","mystery","thriller","horror","fantasy","fiction","non+fiction","dystopian"]

let fetchPromises = sampleSubject.map((subject) => {
    return fetch(`${url}${subject}.json`).then(res => res.json());
});

// Use Promise.all to handle the array of promises
Promise.all(fetchPromises)
    .then(results => {
        // results is an array of responses for each promise
        displayCatalog(results)
    })
    .catch(error => {
        // Handle any error that occurred during any fetch call
        console.error("Error fetching data:", error);
    });

function displayCatalog(subjects) {
    console.log(subjects)

    const main = document.querySelector('main')

    subjects.forEach(subject => {
        let booksString = ""

        subject.works.forEach((work) => {
            booksString += `
                <section class="author-output ">
                    <img style="height: 300px;" class="cover-img" src="${coverUrl}${work.cover_id}-M.jpg" alt="Book Cover">
                    <h1 class="title">${work.title}</h1>
                    <p class="author">${work.authors[0].name}</p>
                    <p class="editions">${work.edition_count}</p>
                    <p class="publish">${work.first_publish_year}</p>
                </section> 
            `
        })

        

        let mockHTML = `
            <div>
                <h2 class="subject-topic">${subject.name[0].toUpperCase() + subject.name.slice(1)}</h2>
                <div class='subject-container'>
                    ${booksString}
                </div>
            </div>
        `

        main.insertAdjacentHTML("beforeend", mockHTML)
    })
}



