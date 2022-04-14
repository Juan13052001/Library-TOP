//* Recuperando el container para colocar las tarjetas de los libros.
const container = document.querySelector(".container");

//* Iniciando el arreglo de libros
let myLibrary = [];
// *Funcion constructora para un nuevo libro
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
//*Prototipo para imprimir la informacion del libro
Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
        this.read ? "read" : "not read"
    }`;
};

Book.prototype.setRead = (read) => (this.read = read);

function getBook(bookTitle) {
    for (let book of myLibrary) {
        if (book.title === bookTitle) {
            return book;
        }
    }
    return null;
}
//*Boton para agregar un libro
const agregarLibro = document.getElementById("addBook");

//* Formulario
const formulario = document.querySelector(".modal-dialog");

//*Abrir el Modal(popup)
const openModal = document.querySelector("#add");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".modal-close");
const isVisible = "is-visible";

//*----------------------------Eventos------------------------------------
window.addEventListener("keydown", cerrarEsc);
openModal.addEventListener("click", abrirModal);
closeModal.addEventListener("click", cerrarModal);
formulario.addEventListener("submit", addBook);

//*----------------------------Funciones de los eventos-------------------------

//*Funcion para abrir el Modal
function abrirModal() {
    formulario.reset();
    modal.classList.add(isVisible);
}

//*Funcion para cerrar el Modal
function cerrarModal(e) {
    modal.classList.remove(isVisible);
}
//*Funcion para cerrar el Modal con la tecla Esc

function cerrarEsc(e) {
    if (e.key === "Escape") {
        modal.classList.remove(isVisible);
    }
}

function addBook(e) {
    e.preventDefault();
    if (addBookToLibray(datosFormulario())) {
        //* Mostrando la lista de libros
        updateListBooks();
        //! Removiendo el modal
        cerrarModal();
    } else {
        alert("Este libro ya existe");
        return;
    }
}

function datosFormulario() {
    const autor = document.querySelector("#author").value;
    const title = document.querySelector("#title").value;
    const pages = document.querySelector("#pages").value;
    const isRead = document.querySelector("#read").checked;
    return new Book(title, autor, pages, isRead);
}

//* Funcion que agrega un nuevo libro al arreglo

function addBookToLibray(newBook) {
    if (myLibrary.some((book) => book.title === newBook.title)) return false;
    myLibrary.push(newBook);
    return true;
}

//*Funcion que recorre todo el array, creando una tarjeta de cada libro
function createCardBooks(book) {
    const containerCard = document.createElement("div");
    const title = document.createElement("h2");
    const author = document.createElement("h3");
    const pages = document.createElement("h3");
    const read = document.createElement("button");
    const botonDelete = document.createElement("button");

    title.textContent = book.title;

    title.classList.add("title");

    author.textContent = book.author;

    author.classList.add("author");

    pages.textContent = book.pages;

    pages.classList.add("pages");

    read.classList.add("button-read");

    botonDelete.textContent = "Remove";

    botonDelete.classList.add("remove-book");

    if (book.read) {
        read.textContent = "Read";
    } else {
        read.textContent = "Not read";
    }

    containerCard.appendChild(title);
    containerCard.appendChild(author);
    containerCard.appendChild(pages);
    containerCard.appendChild(read);
    containerCard.appendChild(botonDelete);
    containerCard.classList.add("item-book");
    container.appendChild(containerCard);
}
function borrarLista() {
    container.innerHTML = "";
}
function updateListBooks() {
    borrarLista();
    for (let book of myLibrary) {
        // borrarLista();
        createCardBooks(book);
    }
}
container.addEventListener("click", checkBooksGridInput);

function eliminarLibro(title) {
    myLibrary = myLibrary.filter((book) => book.title !== title);
}

function checkBooksGridInput(e) {
    if (e.target.classList.contains("remove-book")) {
        eliminarLibro(e.target.parentNode.firstChild.innerHTML);
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    } else if (e.target.classList.contains("button-read")) {
        if (e.target.innerHTML === "Read") {
            getBook(e.target.parentNode.firstChild.innerHTML).setRead(false);
            e.target.innerHTML = "Not read";
            e.target.classList.add("button-danger");
        } else {
            getBook(e.target.parentNode.firstChild.innerHTML).setRead(true);
            e.target.innerHTML = "Read";
            e.target.classList.remove("button-danger");
        }
    }
}
