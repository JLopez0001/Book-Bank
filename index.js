const form = document.getElementById('form')

const navLink = document.querySelector('.navbar-link')

const titleButton = document.querySelector('.title-btn')
const titleInput = document.querySelector('.title-input')

const authorInput = document.querySelector('.author-input')
const authorButton = document.querySelector('.author-btn')

const searchResultsHeading = document.querySelector('.search-results-heading')
const bookResult = document.querySelector('#books-container')

let url = "https://openlibrary.org"
let coverUrl = "https://covers.openlibrary.org"

let searchParam = ''

// Todo: When user clicks on button to have it focused

titleButton.addEventListener('click', (e) => {
  searchParam = 'title'

  e.preventDefault()

  titleInput.style.display = "block"
  authorInput.style.display = "none"
  searchResultsHeading.style.display = "none"
  bookResult.style.display = "none"

  document.querySelector('.title-input input').focus()


  url = "https://openlibrary.org/search.json?title="

  document.querySelector('#books-container').innerHTML = ''
})

authorButton.addEventListener('click', (e) => {
  searchParam = 'author'

  e.preventDefault()

  authorInput.style.display = "block"
  titleInput.style.display = "none"
  searchResultsHeading.style.display = "none"
  bookResult.style.display = "none"

  document.querySelector('.author-input input').focus()

  
  url = "https://openlibrary.org/search.json?author="
  document.querySelector('#books-container').innerHTML = ''

})



function handleBookSearch (e) {
  e.preventDefault()
  let value = e.target[searchParam].value
  console.log(value)
  let inputValue = value.toLowerCase().split(' ').join('+')
  console.log(inputValue)

  if(searchParam === 'title'){
    fetch(`${url}${inputValue}`)
    .then(res => res.json())
   
    .then(res => {
      console.log(res)
      
      let title = res.docs[0].title
      let cover  = res.docs[0].cover_i
      let author = res.docs[0].author_name[0]
      let editions = res.docs[0].edition_count
      let publish = res.docs[0].first_publish_year

      bookResult.innerHTML = ""
      createBookCard(title, cover, author, editions, publish);
    })

    
  } else {

    fetch(`${url}${inputValue}`)    
      .then(res => res.json())
      .then(res => {
        let hash = {}
        bookResult.innerHTML = ""

        for(let i = 0; i <= 10; i++){
          let title = res.docs[i].title
          let cover  = res.docs[i].cover_i
          let author = res.docs[i].author_name[0]
          let editions = res.docs[i].edition_count
          let publish = res.docs[i].first_publish_year
          if(title in hash ){
            continue
          }else {
            hash[title] = true
            createBookCard(title, cover, author, editions, publish);

        }

      }

    })
  }
}

function createBookCard(title, cover, author, editions, publish) {
  const template = document.getElementById('book-card-template').content.cloneNode(true);

  if(!cover){
    template.querySelector('.cover-img').src = 'https://tse3.mm.bing.net/th?id=OIP.P-nIodv7WzkQ4wYYPsXWaQAAAA&pid=Api&P=0&h=220'
    template.querySelector('.cover-img').style = "width: 230px;";
  } else {
    template.querySelector('.cover-img').src = `${coverUrl}/b/id/${cover}-M.jpg`
  }
    searchResultsHeading.style.display = "block"
    
    template.querySelector('.title').textContent = title;
    template.querySelector('.author').innerHTML = `<strong>Author:</strong> ${author}`;
    template.querySelector('.editions').innerHTML = `<strong>Editions:</strong> ${editions}`;
    template.querySelector('.publish').innerHTML = `<strong>First Published:</strong> ${publish}`;

   
    bookResult.appendChild(template)
    bookResult.style.display = "inline-flex"

}

form.addEventListener('submit', handleBookSearch)
