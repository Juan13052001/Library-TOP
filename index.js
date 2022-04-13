let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    // this.info = function () {
    //     return `${this.title} by ${this.author}, ${this.pages} pages, ${
    //         this.read ? "read" : "not read"
    //     }`;
    // };
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
        this.read ? "read" : "not read"
    }`;
};

function addBookToLibray(book) {
    myLibrary.push(book);
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const medicoDeCuerpoAlma = new Book(
    "Medico de Cuerpo y Almas",
    "Caldwell",
    450,
    true
);
addBookToLibray(theHobbit);
addBookToLibray(medicoDeCuerpoAlma);
addBookToLibray(theHobbit);
const container = document.querySelector(".container");
function listBooks(myLibrary) {
    myLibrary.map((book) => {
        let libro = document.createElement("div");
        libro.innerHTML = `<p>Title: ${book.title}</p>`;
        libro.innerHTML += `<p>Author: ${book.author}</p>`;
        libro.innerHTML += `<p>Pages: ${book.pages}</p>`;
        libro.innerHTML += `<p>Read:${book.read}</p>`;
        libro.classList.add("item-book");
        container.appendChild(libro);
    });
}

const agregarLibro = document.getElementById("addBook");
