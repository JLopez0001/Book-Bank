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
  document.querySelector('.title-input input').focus()


  url = "https://openlibrary.org/search.json?title="

  document.querySelector('#books-container').innerHTML = ''
})

authorButton.addEventListener('click', (e) => {
  searchParam = 'author'

  e.preventDefault()
  authorInput.style.display = "block"
  titleInput.style.display = "none"
  document.querySelector('.author-input input').focus()

  
  url = "https://openlibrary.org/search.json?author="
  document.querySelector('#books-container').innerHTML = ''

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
      
      let title = res.docs[0].title
      let cover  = res.docs[0].cover_i
      let author = res.docs[0].author_name[0]
      let editions = res.docs[0].edition_count
      let publish = res.docs[0].first_publish_year

      createBookCard(title, cover, author, editions, publish);
    })
    
  } else {
    fetch(`${url}${inputValue}`)
      .then(res => res.json())
      .then(res => {
        let hash = {}
        for(let i = 0; i <= 10; i++){
          let title = res.docs[i].title
          let cover  = res.docs[i].cover_i
          let author = res.docs[i].author_name[0]
          let editions = res.docs[i].edition_count
          let publish = res.docs[i].first_publish_year
          if(title in hash || author != value){
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
    template.querySelector('.cover-img').src = 'https://www.pngarts.com/files/8/Blank-Book-Cover-PNG-Photo.png'
    template.querySelector('.cover-img').style = "width: 230px; height: auto;";
  } else {
    template.querySelector('.cover-img').src = `${coverUrl}/b/id/${cover}-M.jpg`
  }
    template.querySelector('.title').textContent = title;
    template.querySelector('.author').textContent = `Author: ${author}`;
    template.querySelector('.editions').textContent = `Editions: ${editions}`;
    template.querySelector('.publish').textContent = `First Published: ${publish}`;

    document.getElementById('books-container').appendChild(template)
}

form.addEventListener('submit', handleBookSearch)
