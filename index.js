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

//* Funcion que agrega un nuevo libro con la informacion del formulario
function addBook(e) {
    e.preventDefault();
    //* Recuperando los datos del formulario
    const autor = document.querySelector("#author").value;
    const title = document.querySelector("#title").value;
    const pages = document.querySelector("#pages").value;
    const isRead = document.querySelector("#read").checked;

    //! Agregándolo al array
    addBookToLibray(new Book(title, autor, pages, isRead));
    //* Mostrando la lista de libros
    updateListBooks();
    //! Removiendo el modal
    cerrarModal();
}

//* Funcion que agrega un nuevo libro al arreglo

function addBookToLibray(book) {
    myLibrary.push(book);
}

//*Funcion que recorre todo el array, creando una tarjeta de cada libro
function createCardBooks(book) {
    const containerCard = document.createElement("div");
    const title = document.createElement("h2");
    const author = document.createElement("h3");
    const pages = document.createElement("h3");
    const read = document.createElement("h3");
    const botonDelete = document.createElement("button");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    botonDelete.textContent = "Remove";
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

