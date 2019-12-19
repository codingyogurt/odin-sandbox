// storage ******************
const libraryStorage = [];

// book object
function Book(title, author, pages, cover, wyl, rating, liked, read) {
  this.title = title; // string
  this.author = author; // string
  this.pages = pages; // number
  this.cover = cover; // string
  this.wyl = wyl; // string
  this.rating = rating; // number
  this.liked = liked; // bool
  this.read = read; // bool
}

// add book to storage
function addBookToLibrary(
  title,
  author,
  pages,
  cover,
  wyl,
  rating = 0,
  liked = false,
  read = false
) {
  const newBook = new Book(
    title,
    author,
    pages,
    cover,
    wyl,
    rating,
    liked,
    read
  );
  libraryStorage.push(newBook);
}

// removing book from storage
function removeBookToLibrary(title) {
  for (key in libraryStorage) {
    if (libraryStorage[key].title === title) {
      libraryStorage.splice(key, 1);
    }
  }
}

// editing book from storage
function editBookFromLibrary(title, newBook) {
  removeBookToLibrary(title);
  libraryStorage.push(newBook);
}

// UI & Core functions ******************

// global variable
let selectedRating = 0;
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookCover = document.querySelector("#book-cover");
const read = document.querySelector("#book-read");
const liked = document.querySelector("#book-liked");
const bookPages = document.querySelector("#book-pages");
const bookLearned = document.querySelector("#book-learned");

// the unread section in DOM
const unreadSection = document.querySelector(
  ".unread-books-section .item-container-above"
);
// the liked section in DOM
const likedSection = document.querySelector(
  ".liked-books-section .item-container-above"
);
// the read section in DOM
const readSection = document.querySelector(
  ".read-books-section .item-container-below"
);

// render books
function renderUnreadBooks() {
  // load all unread books from library
  const unreads = libraryStorage.map(book => {
    if (!book.read) {
      return book;
    }
  });

  // loop thru unread and create book html and push to DOM
  unreads.forEach(book => {
    if (book !== undefined) {
      unreadSection.innerHTML = unreadSection.innerHTML + bookToHtml(book);
    }
  });
}

function renderLikedBooks() {
  // load all liked books from library
  const liked = libraryStorage.map(book => {
    if (book.liked) {
      return book;
    }
  });

  // loop thru liked and create book html and push to DOM
  liked.forEach(book => {
    if (book !== undefined) {
      likedSection.innerHTML = likedSection.innerHTML + bookToHtml(book);
    }
  });
}

function renderReadBooks() {
  // load all read books from library
  const read = libraryStorage.map(book => {
    if (book.read) {
      return book;
    }
  });

  // loop thru read and create book html and push to DOM
  read.forEach(book => {
    if (book !== undefined) {
      readSection.innerHTML = readSection.innerHTML + bookToHtml(book);
    }
  });
}

// converts book object to HTML markup for rendering
function bookToHtml(book) {
  return `<div class="book-item">

    <div class="book-image-container">

        <img class="book-image" src="${book.cover}" alt="">

        <div class="book-image-overlay">
            <button class="mini-btn fas fa-edit"></button>
            <button class="mini-btn fas fa-trash"></button>

        </div>

        <div class="bubble">
            <p class="bubble-title">${book.title}</p>
            <p class="bubble-pages">${book.pages} pages</p>
            <p class="bubble-author">${book.author}</p>
            <div class="rating">
                ${ratingToHtml(book.rating)}
            </div>
            <p class="bubble-title1">What I've Learned</p>
            <p class="bubble-learned">${book.wyl}</p>
        </div>

    </div>

    <p class="book-name">
        ${book.title}
    </p>
    <p class="book-author">
        ${book.author}
    </p>
    <div class="rating">
        ${ratingToHtml(book.rating)}
    </div>
</div>`;
}

// converts rating number into i-fa of colored stars or not
function ratingToHtml(rate) {
  let rateHtml = "";
  for (i = 0; i < rate; i++) {
    rateHtml = rateHtml + `<i class="fa fa-star yellow"></i>`;
  }
  if (5 - rate > 0) {
    for (i = 0; i < 5 - rate; i++) {
      rateHtml = rateHtml + `<i class="fa fa-star"></i>`;
    }
  }
  return rateHtml;
}

window.addEventListener("load", () => {
  renderUnreadBooks();
  renderLikedBooks();
  renderReadBooks();
  miniBtnAddEventListener();
});

// starting temporary data
addBookToLibrary(
  "Rich Dad Poor Dad",
  "Robert Kiyosaki",
  365,
  "https://images-na.ssl-images-amazon.com/images/I/51zcMqY7GQL._SX331_BO1,204,203,200_.jpg",
  "Learned about assets",
  4,
  false,
  true
);
addBookToLibrary(
  "Secrets of the Millionaire Mind",
  "T.Harve Eker",
  450,
  "https://images-na.ssl-images-amazon.com/images/I/41CnX3uTZFL.jpg",
  "Learned about understanding rich people",
  4,
  false,
  true
);
addBookToLibrary(
  "How to Win Friends and Influence People",
  "Dale Carnegie",
  500,
  "https://images-na.ssl-images-amazon.com/images/I/41AKuWAA8yL._SX319_BO1,204,203,200_.jpg",
  "Learned about dealing with people",
  3,
  true,
  false
);
addBookToLibrary(
  "4 Hour Work Week",
  "Tim Ferris",
  356,
  "https://images-na.ssl-images-amazon.com/images/I/81qW97ndkvL.jpg",
  "Learned how to work lesser",
  3,
  true,
  false
);

function toggleAddBookUI() {
  // toggle add-book view
  document.querySelector(".add-book").classList.toggle("show-add-book");
  // toggle overlay
  document
    .querySelector(".add-book-overlay")
    .classList.toggle("show-add-book-overlay");
}

// add-book-toggle view/hide
document.querySelector("#add-book-toggle").addEventListener("click", e => {
  toggleAddBookUI();
});

// cancel-btn toggle add-book-toogle
document.querySelector(".cancel-btn").addEventListener("click", e => {
  e.preventDefault();
  toggleAddBookUI();
});

document.querySelector(".add-book-overlay").addEventListener("click", e => {
  toggleAddBookUI();
});

function miniBtnAddEventListener() {
  // add-book-toggle view/hide for mini-btns
  document.querySelectorAll(".mini-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      if (e.target.classList.contains("fa-edit")) {
        toggleAddBookUI();
        addBookUIModeOn(false);
      }
    });
  });
}

document.querySelector("#add-book-toggle").addEventListener("click", () => {
  addBookUIModeOn(true);
});

function addBookUIModeOn(state) {
  // true = add book mode, false edit book mode
  if (state) {
    document.querySelector(".add-book-head").textContent = "Add a book";
    document.querySelector("#add-book").textContent = "Add book";
  } else {
    document.querySelector(".add-book-head").textContent = "Edit book";
    document.querySelector("#add-book").textContent = "Edit book";
  }
}

// add new book to ui individually and with clearing books in UI first
function addNewBooktoUI(book) {
  if (book.read) {
    readSection.innerHTML = "";
    renderReadBooks();
  } else {
    unreadSection.innerHTML = "";
    renderUnreadBooks();
  }
  if (book.liked) {
    likedSection.innerHTML = "";
    renderLikedBooks();
  }
}

// adding book function
document
  .querySelector(".book-form-buttons #add-book")
  .addEventListener("click", e => {
    e.preventDefault();
    let newBookTitle = bookTitle.value;
    let newBookAuthor = bookAuthor.value;
    let newBookCover = bookCover.value;
    let newRead = read.checked;
    let newLiked = liked.checked;
    let newBookPages = bookPages.value;
    let newBookLearned = bookLearned.value;
    let newBookRate = selectedRating;

    addBookToLibrary(
      newBookTitle,
      newBookAuthor,
      newBookPages,
      newBookCover,
      newBookLearned,
      newBookRate,
      newLiked,
      newRead
    );

    const book = new Book(
      newBookTitle,
      newBookAuthor,
      newBookPages,
      newBookCover,
      newBookLearned,
      newBookRate,
      newLiked,
      newRead
    );

    addNewBooktoUI(book);

    miniBtnAddEventListener();

    toggleAddBookUI();
  });

// gets data of the rating clicked set to a global variable
document.querySelectorAll(".new-book-rating .fa-star").forEach(star => {
  star.addEventListener("click", e => {
    selectedRating = e.target.getAttribute("data-value");
  });
});
