const form = document.getElementById('form')

const titleButton = document.querySelector('.title-btn')
const titleInput = document.querySelector('.title-input')

const authorInput = document.querySelector('.author-input')
const authorButton = document.querySelector('.author-btn')

let url = "https://openlibrary.org"
let coverUrl = "https://covers.openlibrary.org"

let searchParam = ''


// Todo: When user clicks on button to have it focused

titleButton.addEventListener('click', (e) => {
  searchParam = 'title'

  e.preventDefault()
  titleInput.style.display = "block"
  authorInput.style.display = "none"

  url = "https://openlibrary.org/search.json?title="
  
})

authorButton.addEventListener('click', (e) => {
  searchParam = 'author'

  e.preventDefault()
  authorInput.style.display = "block"
  titleInput.style.display = "none"
  
  url = "https://openlibrary.org/search.json?author="
  
})



function handleBookSearch (e) {
  e.preventDefault()
  let value = e.target[searchParam].value
  let inputValue = value.toLowerCase().split(' ').join('+')
  
  if(searchParam === 'title'){
    fetch(`${url}${inputValue}`)
    .then(res => res.json())
   
    .then(res => {
      console.log(res)
      let image = document.querySelector(".cover-img")
      const title = document.querySelector('.title')
      const author = document.querySelector('.author')
      const editions = document.querySelector('.editions')
      const publish = document.querySelector('.publish')

      title.textContent = res.docs[0].title
      author.textContent = `Author: ${res.docs[0].author_name}`
      editions.textContent = `Total Editions: ${res.docs[0].edition_count}`
      publish.textContent = `First Year Published: ${res.docs[0].first_publish_year}`
      let cover = res.docs[0].cover_i
      
      image.setAttribute('src',`${coverUrl}/b/id/${cover}-M.jpg` )
    })
  } else {
    fetch()
  }
  
}

form.addEventListener('submit', handleBookSearch)
