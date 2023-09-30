// Array that contains all books currently on the library shelf
// arrayOfBooks is initialized with a default/example boo
let arrayOfBooks = [new Book("It", "King", true)];

// constants for the dialog modal
const openModalBtn = document.getElementById("openModal");
const dialog = document.getElementById("addBookModal");
const title = document.getElementById("title");
const author = document.getElementById("author");
const read = document.getElementById("read");
const addBookBtn = document.getElementById("addButton");

// Book constructor for creating new instance of Book
function Book(title, author, read) {
  this.title = title;
  this.author = author;
  this.read = read;
}

// Adds an instance of book to arrayOfBooks
function addBooktoArrayOfBooks(title, author, read) {
  arrayOfBooks.push(new Book(title, author, read));
}

// Displays book in bookShelf (container for books)
function addBookToShelf(bookTemplate) {
  const bookShelf = document.getElementById("bookShelf");
  bookShelf.insertAdjacentHTML("afterbegin", bookTemplate);
}

// Template used to format a book entry
function createBookDisplayTemplate(bookInfo) {
  const bookTemplate = `
    <div class="book">
      <p><span class="book-entry-text">Title:</span><span class="book-info-text"> ${bookInfo.title}</span></p>  
      <p><span class="book-entry-text">Author:</span><span class="book-info-text"> ${bookInfo.author}</span></p>
      <div class="bookButtons">
        <button id="markRead">Read</button>
        <button id="deleteBook">Delete</button>
      </div>
    </div>`;
  return bookTemplate;
}

// adding a book to the book shelf container
function processBooks() {
  arrayOfBooks.forEach((book) => {
    const template = createBookDisplayTemplate(book);
    addBookToShelf(template);
    addDeleteBookEventListener();
    addBookReadEventListener();
  });
}

// reset input and select values of modal
function resetModalValues() {
  title.value = "";
  author.value = "";
  read.value = "default";
}

// function that adds an event listener to a future button
function addDeleteBookEventListener() {
  const deleteBookBtn = document.getElementById("deleteBook");
  deleteBookBtn.addEventListener("click", (event) => {
    deleteBookEventHandler(event);
  });
}

// contains logic for event handler callback function
function deleteBookEventHandler(event) {
  const titleOfBook = returnTitle(event);
  const indexOfBookInArray = findIndexOfBook(titleOfBook);
  deleteBookFromArray(indexOfBookInArray);
  resetBookShelf();
  processBooks();
}

//function that adds an event listener to a future button
function addBookReadEventListener() {
  const markReadBtn = document.getElementById("markRead");
  markReadBtn.addEventListener("click", (event) => {
    bookReadEventHandler(event);
  });
}

//contains logic for event listener callback function
function bookReadEventHandler(event) {
  const title = returnTitle(event);
  const arrayLength = arrayOfBooks.length;
  for (let i = 0; i < arrayLength; i++) {
    const book = arrayOfBooks[i];
    if (book.title === title) {
      if (book.read === true) {
        book.read = false;
        event.target.textContent = "Unread";
      } else {
        book.read = true;
        event.target.textContent = "Read";
      }
    }
  }
}

// function that accepts an integer to be used to remove an element
// from arrayOfBooks
function deleteBookFromArray(index) {
  const numberOfArrayElementsToRemove = 1;
  arrayOfBooks.splice(index, numberOfArrayElementsToRemove);
}

// function that accepts a string and returns the index
// as an integer
function findIndexOfBook(titleOfBook) {
  let arrayLength = arrayOfBooks.length;
  for (let i = 0; i < arrayLength; i++) {
    const book = arrayOfBooks[i];
    if (book.title === titleOfBook) {
      return i;
    }
  }
}

// function that resets the bookshelf or resets the bookshelf
//  and displays a message
function resetBookShelf() {
  const bookShelf = document.getElementById("bookShelf");

  arrayOfBooks.length === 0
    ? (bookShelf.innerHTML = "<span>Currently Empty!</span>")
    : (bookShelf.innerHTML = "");
}

// function accepts an event and returns a book title as
//  a string
function returnTitle(event) {
  const deleteButtonParent = event.target.parentNode.parentNode;
  const title = deleteButtonParent.children[0].textContent.slice(7);
  return title;
}

//  modal event listeners

openModalBtn.addEventListener("click", () => {
  resetModalValues();
  dialog.showModal();
});

dialog.addEventListener("close", (e) => {
  if (title.value && author.value) {
    addBooktoArrayOfBooks(title.value, author.value, read.value);
    const bookShelf = document.getElementById("bookShelf");
    bookShelf.innerHTML = "";
    processBooks();
  }
});

addBookBtn.addEventListener("click", (event) => {
  event.preventDefault();
  dialog.close();
});

// call the function on pageload to begin the library process
processBooks();
