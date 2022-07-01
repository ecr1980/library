let firstBook = new Book("Lord of the Pings", "J. R. R. Terminal", 35, true)
let secondBook = new Book("A Tale of Three Cities", "Duck Chickens", 942, true)
let thirdBook = new Book("Huckleberry Fish", "Marty Twine", 214, false)
const tableID = document.getElementById('book-table')
const bookList= [firstBook, secondBook, thirdBook];


const bookSubmitButton = document.getElementById('book-submit')
const showFormButton = document.getElementById('show-form')


bookSubmitButton.addEventListener('click', () => {
  createNewBook()
})

showFormButton.addEventListener('click', () => {
  toggleShowForm()
})




function addIfRead(book, readCell){
  if (book.haveRead == true) {
    haveReadText = "yes"
  }
  else {
    haveReadText = "no"
  }
  let cellText = document.createTextNode(haveReadText)
  readCell.appendChild(cellText)
}

function Book(title, author, pageCount, haveRead) {
  this.title = title
  this.author = author
  this.pageCount = pageCount
  this.haveRead = haveRead

  this.bookInfo = function() {
    let readFiller = "has been"
    if (this.haveRead == false) {
      readFiller = "not yet"
    }
    let info = (`${this.title}, by ${this.author}, ${this.pageCount} pages, ${readFiller} read.`)
    return info
  }
}

function clearForm() {
  document.getElementById('title').value = ""
  document.getElementById('author').value = ""
  document.getElementById('pages').value = ""
  document.getElementById('read').checked = false
}

function createNewBook(){
  let newTitle = document.getElementById('title').value
  let newAuthor = document.getElementById('author').value
  let newPageCount = document.getElementById('pages').value
  const newRead = document.getElementById('read')
  let wasRead = false
    if (newRead.checked) {
      wasRead = true
    }

  const newBook = new Book(newTitle, newAuthor, newPageCount, wasRead)
  bookList.push(newBook)
  addBookRow(bookList.length - 1)
  clearForm()
  toggleShowForm()
}

function addBookRow (i) {
  let bookRow = tableID.insertRow(-1)
  let titleCell = bookRow.insertCell()
  let cellText = document.createTextNode(bookList[i].title)
  titleCell.appendChild(cellText)

  let authorCell = bookRow.insertCell()
  cellText = document.createTextNode(bookList[i].author)
  authorCell.appendChild(cellText)

  let pagesCell = bookRow.insertCell()
  cellText = document.createTextNode(bookList[i].pageCount)
  pagesCell.appendChild(cellText)

  let readCell = bookRow.insertCell()
  addIfRead(bookList[i], readCell)

  let toggleReadCell = bookRow.insertCell()
  let readButton = document.createElement('button')
  readButton.innerHTML = "Read"
  readButton.addEventListener('click', () => {
    toggleRead(bookList[i], readCell)
  })
  toggleReadCell.appendChild(readButton)

  let removeBookCell = bookRow.insertCell()
  let removeButton = document.createElement('button')
  removeButton.innerHTML = "Remove Book"
  removeButton.addEventListener('click', () => {
    removeBook(i)
  })


  removeButton.class = "remove-book-button"
  removeBookCell.appendChild(removeButton)
}

function displayBooks (bookTableID) {
  for(let i = 0; i < bookList.length; i++) {
    addBookRow(i, bookTableID)
  }
}

function removeBook(i) {
  tableID.deleteRow(i+1)
  bookList.splice(i, 1)
}
function toggleRead(book, readCell){
  if (book.haveRead == true) {
    book.haveRead = false
    readCell.innerHTML = "no"
  }
  else {
    book.haveRead = true
    readCell.innerHTML = "yes"
  }
}

function toggleShowForm(){
  const bookform = document.getElementById('book-form')
  bookform.toggleAttribute("hidden")
}


displayBooks()

