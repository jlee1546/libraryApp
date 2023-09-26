let arrayOfBooks = [];

const openModalBtn = document.getElementById("openModal");
const deleteBookText = document.getElementById("bookToDeleteText");
const deleteBookBtn = document.getElementById("deleteButton");
const dialog = document.getElementById("addBookModal");

// Default book used as example
const defaultBook = new Book("It", "King", true);
arrayOfBooks.push(defaultBook);

function Book(title, author, read) {
  this.title = title;
  this.author = author;
  this.read = read;
}

function addBooktoArrayOfBooks(title, author, read) {
  arrayOfBooks.push(new Book(title, author, read));
}

function addBookToShelf(bookTemplate) {
  const bookShelf = document.getElementById("bookShelf");
  bookShelf.insertAdjacentHTML("afterbegin", bookTemplate);
}
function createBookDisplayTemplate(bookInfo) {
  const bookTemplate = `<div class="book">${bookInfo.title} ${bookInfo.author} ${bookInfo.read}</div>`;
  return bookTemplate;
}

function processBooks() {
  arrayOfBooks.forEach((book) => {
    const template = createBookDisplayTemplate(book);
    addBookToShelf(template);
  });
}

// event listeners

openModalBtn.addEventListener("click", () => {
  dialog.showModal();
});

processBooks();
