var myLibrary = [];
var i = 0;
var modal = document.getElementById('modalBox');
document.getElementsByClassName('close')[0].addEventListener('click', () => modal.style.display = "none");
document.getElementById('btn').addEventListener('click', () => modal.style.display = "block");
document.getElementById('submit').addEventListener('click', addBookToLibrary);
window.onclick = function (event) {
    if (event.target == modal) modal.style.display = "none";
}

//return book status from input and toggle button
function readStatus(e) {
    if(e.type =='checkbox'){
        var status = document.getElementById('status').checked;

            if (status == true) {
                return 'Read';
            } else {
                return 'Not read';
            }
        }
    if(e.type =='click'){
    var toggleStatus= document.querySelector(`button[data-num='${e.target.dataset.num}']`);
        if(toggleStatus.innerHTML=='Read'){
        toggleStatus.innerHTML='Not read';
        myLibrary[e.target.dataset.num][status]='Not read';
        } 
    else if(toggleStatus.innerHTML=='Not read'){
        toggleStatus.innerHTML='Read';
        myLibrary[e.target.dataset.num][status]='read';
    }
    }
}

//constructor function
function book(title, author, year, pages, status) {
    this.title = title
    this.author = author
    this.year = year
    this.pages = pages
    this.status = readStatus(status)
}

//link DOM to prototype 
//store object in array
function addBookToLibrary() {
    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;
    var year = document.getElementById('year').value;
    var pages = document.getElementById('pages').value;
    var status = document.getElementById('status');
    if(title && author){
    const newBook = new book(title, author, year, pages, status);
    myLibrary[i] = newBook;
    displayBook(this, myLibrary);
    i++;
    modal.style.display = "none";
    } else{
        alert('Please enter title and author');
    }
}

//create elements to display info 
function displayBook() {
    const bookList = document.querySelector('#book-list');
    const template = document.createElement('div');
    template.className = 'template';
    bookList.appendChild(template);
    const templateContent = document.createElement('div');
    templateContent.className = 'templateContent';
    template.appendChild(templateContent); 

    for (var x in myLibrary[i]) {
        if (Object.prototype.hasOwnProperty.call(myLibrary[i], x)) {
            let displayedTitle=x[0].toUpperCase()+x.slice(1);
            if (displayedTitle == 'Title'){
                var item = document.createElement('h3');
                item.className = 'item';
                item.textContent = `${myLibrary[i][x]}`;
            } else {
                var item = document.createElement('p');
                item.className = 'item';
                    if (displayedTitle == 'Author') {
                        item.textContent = ` By ${myLibrary[i][x]}`;
                    }
                    if (displayedTitle == 'Year' && myLibrary[i][x]) {
                        item.textContent = ` Year ${myLibrary[i][x]}`;
                    } 
                    if (displayedTitle == 'Pages' && myLibrary[i][x]) {
                        item.textContent = ` ${myLibrary[i][x]} ${displayedTitle} `;
                    }
            }
            template.appendChild(item);

            if (displayedTitle == 'Status') {
                var bookStatusBtn = document.createElement("BUTTON");
                bookStatusBtn.className = "bookStatusBtn";
                bookStatusBtn.textContent = `${myLibrary[i][x]}`;
                template.appendChild(bookStatusBtn);
                bookStatusBtn.addEventListener('click', readStatus);
                bookStatusBtn.dataset.num=i;
            }
        }
    }
    var removeButton = document.createElement("BUTTON");
    removeButton.className = "removeBtn";
    removeButton.textContent = "Delete";
    template.appendChild(removeButton);
    removeButton.addEventListener('click', remove);
    removeButton.dataset.num=i;
}

 // select parent element and remove DOM
function remove(e){  
    const removeBook= document.querySelector(`button[data-num='${e.target.dataset.num}']`).parentElement;
    removeBook.remove();
}
