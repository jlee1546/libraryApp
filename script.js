let arrayOfBooks = [new Book("It", "King", true)];

const openModalBtn = document.getElementById("openModal");
const deleteBookText = document.getElementById("bookToDeleteText");

const dialog = document.getElementById("addBookModal");
const title = document.getElementById("title");
const author = document.getElementById("author");
const read = document.getElementById("read");
const addBookBtn = document.getElementById("addButton");

// Default book used as example
// const defaultBook = new Book("It", "King", true);
// arrayOfBooks.push(defaultBook);

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
      <p>Title: ${bookInfo.title}</p>  
      <p>Author: ${bookInfo.author}</p>
      <div>
        <button id="markRead">Read</button>
        <button id="deleteBook">Delete</button>
      </div>
    </div>`;
  return bookTemplate;
}

// Controls the book process
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

function addDeleteBookEventListener() {
  const deleteBookBtn = document.getElementById("deleteBook");
  deleteBookBtn.addEventListener("click", (event) => {
    deleteBookEventHandler(event);
  });
}

function deleteBookEventHandler(event) {
  const titleOfBook = returnTitle(event);
  const indexOfBookInArray = findIndexOfBook(titleOfBook);
  deleteBookFromArray(indexOfBookInArray);
  resetBookShelf();
  processBooks();
}

function addBookReadEventListener() {
  const markReadBtn = document.getElementById("markRead");
  markReadBtn.addEventListener("click", (event) => {
    const title = returnTitle(event);
    const arrayLength = arrayOfBooks.length;
    for (let i = 0; i < arrayLength; i++) {
      if (arrayOfBooks[i].title === title) {
        if (arrayOfBooks[i].read === true) {
          arrayOfBooks[i].read = false;
          event.target.textContent = "Unread";
        } else {
          arrayOfBooks[i].read = true;
          event.target.textContent = "Read";
        }
      }
    }
  });
}

function deleteBookFromArray(index) {
  const numberOfArrayElementsToRemove = 1;
  arrayOfBooks.splice(index, numberOfArrayElementsToRemove);
}

function findIndexOfBook(titleOfBook) {
  let arrayLength = arrayOfBooks.length;
  for (let i = 0; i < arrayLength; i++) {
    if (arrayOfBooks[i].title === titleOfBook) {
      return i;
    }
  }
}

function resetBookShelf() {
  const bookShelf = document.getElementById("bookShelf");
  bookShelf.innerHTML = "";
}

function returnTitle(event) {
  const deleteButtonParent = event.target.parentNode.parentNode;
  const title = deleteButtonParent.children[0].textContent.slice(7);
  return title;
}

// event listeners

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

processBooks();
