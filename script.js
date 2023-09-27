let arrayOfBooks = [];

const openModalBtn = document.getElementById("openModal");
const deleteBookText = document.getElementById("bookToDeleteText");
const deleteBookBtn = document.getElementById("deleteButton");
const dialog = document.getElementById("addBookModal");
const title = document.getElementById("title");
const author = document.getElementById("author");
const read = document.getElementById("read");
const addBookBtn = document.getElementById("addButton");

// Default book used as example
const defaultBook = new Book("It", "King", true);
arrayOfBooks.push(defaultBook);

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
  const bookTemplate = `<div class="book">${bookInfo.title} ${bookInfo.author} ${bookInfo.read}</div>`;
  return bookTemplate;
}

// Conttrols the book process
function processBooks() {
  arrayOfBooks.forEach((book) => {
    const template = createBookDisplayTemplate(book);
    addBookToShelf(template);
  });
}

// reset input and select values of modal
function resetModalValues() {
  title.value = "";
  author.value = "";
  read.value = "default";
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
