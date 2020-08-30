let library = [];

const main = document.querySelector("#main");

renderLibrary();


/* Book constructor, a book is defined these fields:
* author: a string to define who is the author of the book
* title: a string for the title of the book
* pages: a number for how many pages in the book
* color: a string defining what color to use for the book display
* read: a boolean value to define where the book has been read or not
*
* Books are defined to be equivalent to eachother if they have
* the same author and title, you may not add equivalent books to the library
*/
function Book (author, title, pages, read, color){
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.color = color;
    this.toggleRead = () => {
        this.read = !this.read;
    }
    this.removeFromLibrary = () => {
        library = library.filter(book => !book.equals(this));
    }
    this.equals = (book) => {
        return (this.author === book.author) && (this.title === book.title);
    }
    this.info = () => {
        return 'author: ' + this.author +"\ntitle: " + this.title + "\npages: " + this.pages + "\nread: " + this.read;
    }
} 

function addBookToLibrary (book) {
    for(i = 0; i < library.length; i++) {
        if(library[i].equals(book)) {
            return false;
        }
    }
    library.push(book);
    return true;
}

function findBookInLibrary(author, title){
    comparisonBook = new Book(author, title, 0, false, "");
    for(i = 0; i < library.length; i++) {
        if(comparisonBook.equals(library[i])){
            return library[i];
        }
    }
}

function renderBook(book) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.id = book.author + book.title;
    bookDiv.style.backgroundColor = book.color;

    const authorDiv = document.createElement("div");
    authorDiv.classList.add("author");
    authorDiv.textContent = book.author;

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.textContent = book.title;

    const check = document.createElement("img");
    check.classList.add("check");
    check.src = "images/checkmark.png";
    if(!book.read){
        check.classList.add("hidden");
    }

    const pageDiv = document.createElement("div");
    pageDiv.textContent = book.pages + " pages";
    pageDiv.classList.add("pages");
    
    const readButton = document.createElement("button");
    readButton.textContent = "Read";
    readButton.classList.add("read");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");

    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(pageDiv);
    bookDiv.appendChild(check);
    bookDiv.appendChild(readButton);
    bookDiv.appendChild(deleteButton);

    main.appendChild(bookDiv);
    readButton.addEventListener('click', () => {
        if(book.read){
            check.classList.add("hidden");
        } else {
            check.classList.remove("hidden");
        }
        book.toggleRead();
    })
    deleteButton.addEventListener('click', () => {
        book.removeFromLibrary();
        main.removeChild(bookDiv);
    })
}

function renderLibrary(){
    for(i = 0; i < library.length; i++){
        renderBook(library[i]);
    }
}

function clear(){
    main.innerHTML = '';
}