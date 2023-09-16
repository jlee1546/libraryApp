let bookArray = [];

function Books(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.displayBookInfo = function () {
    return `${title} written by ${author} has ${pages} pages and ${
      isRead ? "has been read" : "has not been read"
    }`;
  };
}

function captureBookInformation() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("read").value;

  bookArray.push(new Books(title, author, pages, isRead));
}

function writeBookToList(index) {
  const bookList = document.getElementById("bookList");
  const listItem = document.createElement("li");
  const buttonOne = document.createElement("button");
  const buttonTwo = document.createElement("button");
  buttonOne.textContent = "Remove";
  buttonTwo.textContent = "Read";
  buttonOne.classList.add("bookRemove");
  buttonTwo.classList.add("bookRead");

  listItem.textContent = bookArray[index].displayBookInfo();

  bookList.appendChild(listItem);
  listItem.insertAdjacentElement("beforeend", buttonOne);
  buttonOne.insertAdjacentElement("afterend", buttonTwo);
}

function resetForm() {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const isRead = document.getElementById("read");

  title.value = "";
  author.value = "";
  pages.value = "";
  isRead.value = "";
}

const addBook = document.querySelector(".bookAdd");
addBook.addEventListener("click", () => {
  captureBookInformation();
  if (bookArray.length > 0) {
    const lastElementInBookArray = bookArray.length - 1;
    writeBookToList(lastElementInBookArray);
    resetForm();
  }
});
