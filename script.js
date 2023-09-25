// let bookArray = [];

// let inventory = document.getElementById("libraryInventory");
// let book = document.createElement("h3");
// const buttonOne = document.createElement("button");
// const buttonTwo = document.createElement("button");
// buttonOne.textContent = "Remove";
// buttonOne.classList.add("removeButton");
// buttonTwo.textContent = "Mark Read";
// buttonTwo.classList.add("readButton");

// // starting point used as a counter while iterating the bookArray to
// // prevent loop from printing something an extra time
// let startingPoint = 0;

// function Books(title, author, pages, isRead) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.isRead = isRead;
// }

// function addBookToArray() {
//   const title = document.getElementById("title").value;
//   const author = document.getElementById("author").value;
//   const pages = document.getElementById("pages").value;
//   const isRead = document.getElementById("read").value;

//   bookArray.push(new Books(title, author, pages, isRead));
// }

// function writeBookToList() {
//   for (let i = startingPoint; i < bookArray.length; i++) {
//     book.textContent = `${bookArray[i].title}`;
//     book.setAttribute("id", i);
//     inventory.insertAdjacentElement("afterend", book);
//     book.insertAdjacentElement("beforeend", buttonOne);
//     buttonOne.setAttribute("dataIndex", i);
//     buttonOne.addEventListener("click", (event) => {
//       removeBook(event);
//     });
//     buttonOne.insertAdjacentElement("afterend", buttonTwo);
//     startingPoint += 1;
//   }
// }

// function removeBook(event) {
//   const valueForId = parseInt(
//     event.target.attributes.getNamedItem("dataIndex").value
//   );
//   const book = document.getElementById(valueForId);
//   book.parentNode.removeChild(book);

//   bookArray.splice(valueForId, 1);
//   console.log(valueForId);
//   console.log(bookArray);
//   writeBookToList();
// }

// function resetForm() {
//   const title = document.getElementById("title");
//   const author = document.getElementById("author");
//   const pages = document.getElementById("pages");
//   const isRead = document.getElementById("read");

//   title.value = "";
//   author.value = "";
//   pages.value = "";
//   isRead.value = "";
// }

// const addBook = document.querySelector(".bookAdd");
// addBook.addEventListener("click", () => {
//   addBookToArray();
//   writeBookToList();
//   resetForm();
// });
let default_array = [
  { title: "it", author: "king", pages: 1000, isRead: false },
  { title: "carrie", author: "king", pages: 456, isRead: true },
  { title: "cujo", author: "king", pages: 234, isRead: false },
  { title: "game of thrones", author: "martin", pages: 1200, isRead: false },
];
let arrayForBooks = [];

const writeButton = document.querySelector("#writeButton");
const deleteButton = document.getElementById("deleteButton");
const deleteText = document.getElementById("deleteText");
const container = document.getElementById("container");

function getRead() {
  const readButtons = document.querySelectorAll(".isRead");
  const unReadButtons = document.querySelectorAll(".isUnread");
  console.log(readButtons);
  readButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      changeBookReadStatus(event);
    });
  });
  unReadButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      changeBookReadStatus(event);
    });
  });
}

writeButton.addEventListener("click", writeButtonHandler);

function writeButtonHandler() {
  writeBooksToScreen(arrayForBooks);
  deleteButtonHandler();
  getRead();
}

function deleteButtonHandler() {
  deleteButton.addEventListener("click", () => {
    let title = deleteText.value;
    removeBookFromArray(getBookIndex(title));

    container.innerHTML = "";
    writeBooksToScreen(arrayForBooks);
    getRead();
  });
}

function Books(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function writeToArray(array) {
  let element;
  for (element of array) {
    arrayForBooks.push(
      new Books(element.title, element.author, element.pages, element.isRead)
    );
  }
}

function getBookIndex(text) {
  let book;
  for (book of arrayForBooks) {
    if (book.title === text) {
      return arrayForBooks.indexOf(book);
    }
  }
}

function removeBookFromArray(index) {
  if (index !== undefined) {
    arrayForBooks.splice(index, 1);
  }
}

function render(book) {
  const template = `
  <div class="book-container">
    <p class="title">Title: ${book.title}</p>
    <p class="author">Author: ${book.author}</p>
    <p class="pages">Pages: ${book.pages}</p>
    
    <button class=${book.isRead ? "isRead" : "isUnread"}>${
    book.isRead ? "read" : "unread"
  }</button>
  </div>`;

  return template;
}
let apple;
function writeBooksToScreen(array) {
  if (array.length === 0 || array.length === container.childElementCount) {
    return;
  } else {
    let book;
    for (book of array) {
      container.insertAdjacentHTML("beforeend", render(book));
    }
  }
}

function changeBookReadStatus(event) {
  arrayForBooks.forEach((book) => {
    const bookTitle = event.target.parentNode.children[0].textContent.slice(7);

    if (book.title === bookTitle) {
      if (book.isRead === false) {
        book.isRead = true;
        event.target.textContent = "read";
        event.target.className = "isRead";
        console.log("me");
      } else {
        book.isRead = false;
        event.target.textContent = "unread";
        event.target.className = "isUnread";
      }
    }
  });
}

writeToArray(default_array);
