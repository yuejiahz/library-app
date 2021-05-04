var myLibrary = [];
var i = 0;
var modal = document.getElementById('modalBox');
document.getElementsByClassName('close')[0].addEventListener('click', () => modal.style.display = "none");
document.getElementById('btn').addEventListener('click', () => modal.style.display = "block");
document.getElementById('submit').addEventListener('click', addBookToLibrary);
window.onclick = function (event) {
    if (event.target == modal) modal.style.display = "none";
}

function readStatus(e) {
    var status = document.getElementById('status').checked;
    if (status == true) {
        return 'Read';
    } else {
        return 'Unread';
    }
}
function book(title, author, year, pages, status) {
    this.title = title
    this.author = author
    this.year = year
    this.pages = pages
    this.status = readStatus(status)
}

function addBookToLibrary() {
    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;
    var year = document.getElementById('year').value;
    var pages = document.getElementById('pages').value;
    var status = document.getElementById('status');
    const newBook = new book(title, author, year, pages, status);
    myLibrary[i] = newBook;
    displayBook(this, myLibrary);
    i++;
    modal.style.display = "none";
}

function displayBook() {
    const bookList = document.querySelector('#book-list');
    const template = document.createElement('div');
    template.className = 'template';
    bookList.appendChild(template);
    const templateContent = document.createElement('div');
    templateContent.className = 'templateContent';
    //template.dataset.num=i;
    template.appendChild(templateContent); 

    for (var x in myLibrary[i]) {
        if (Object.prototype.hasOwnProperty.call(myLibrary[i], x)) {
           
            let displayedTitle=x[0].toUpperCase()+x.slice(1);
            if (displayedTitle == 'Pages') displayedTitle='No. Of Pages';
            var item = document.createElement('p');
            item.className = 'item';
            item.textContent = ` ${displayedTitle} : ${myLibrary[i][x]}`;
            template.appendChild(item);
        }
    }
    var removeButton = document.createElement("BUTTON");
    removeButton.className = "removeBtn";
    removeButton.textContent = "REMOVE";
    template.appendChild(removeButton);
    removeButton.addEventListener('click', remove);
    removeButton.dataset.num=i;
}

function remove(e){  
    const removeBook= document.querySelector(`button[data-num='${e.target.dataset.num}']`).parentElement;
    removeBook.remove();
}
