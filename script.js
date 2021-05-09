let myLibrary = JSON.parse(localStorage.getItem("books")) || [];
const modal = document.getElementById('modalBox');
document.getElementsByClassName('close')[0].addEventListener('click', () => modal.style.display = "none");
document.getElementById('btn').addEventListener('click', () => modal.style.display = "block");
document.getElementById('submit').addEventListener('click', addBookToLibrary);
document.getElementById('clear').addEventListener('click', clear);
window.addEventListener('load', () => {
    for (i = 0; i < myLibrary.length; i++) displayBooks(i);
});
//close modal box when click outside of box area
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
}

//return book status from input and toggle button
function readStatus(e) {
    if (e.type == 'checkbox') {
        var status = document.getElementById('status').checked;

        if (status == true) {
            return 'Read';
        } else {
            return 'Unread';
        }
    }
    if (e.type == 'click') {
        var toggleStatus = document.querySelector(`button[data-num='${e.target.dataset.num}']`);
        if (toggleStatus.innerHTML === 'Read') {
            toggleStatus.innerHTML = 'Unread';
            myLibrary[e.target.dataset.num]['status'] = 'Unread';
        }
        else if (toggleStatus.innerHTML === 'Unread') {

            toggleStatus.innerHTML = 'Read';
            myLibrary[e.target.dataset.num]['status'] = 'Read';
        }
        window.localStorage.setItem(`books`, JSON.stringify(myLibrary));
    }
}

//constructor function
function Book(title, author, year, pages, status) {
    this.title = title
    this.author = author
    this.year = year
    this.pages = pages
    this.status = readStatus(status)
}

//call prototype function 
//store object in array
function addBookToLibrary() {
    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;
    var year = document.getElementById('year').value;
    var pages = document.getElementById('pages').value;
    var status = document.getElementById('status');
    
    if(title && author){
    const newBook = new Book(title, author, year, pages, status);
    myLibrary.push(newBook);
    window.localStorage.setItem(`books`, JSON.stringify(myLibrary));
    displayBooks();
    modal.style.display = "none";
    form.reset();
    }
}

//create elements to display info 
function displayBooks(index) {
    if (typeof index == 'number') i = index;
    if (!(typeof index == 'number')) i = myLibrary.length - 1;

    const container = document.querySelector('#container');
    const template = document.createElement('div');
    template.classList.add('template');
    container.appendChild(template);
    const templateContent = document.createElement('div');
    templateContent.classList.add('templateContent');
    template.appendChild(templateContent);

    for (var x in myLibrary[i]) {
        let displayedTitle = x[0].toUpperCase() + x.slice(1);
        if (displayedTitle == 'Title') {
            var item = document.createElement('h3');
            item.classList.add('item');
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
            bookStatusBtn.dataset.num = i;
        }
    }
    var removeButton = document.createElement("BUTTON");
    removeButton.className = "removeBtn";
    removeButton.textContent = "Delete";
    template.appendChild(removeButton);
    removeButton.addEventListener('click', remove);
    removeButton.dataset.num = i;
}

// select parent element and remove DOM
function remove(e) {
    const removeBook = document.querySelector(`button[data-num='${e.target.dataset.num}']`).parentElement;
    removeBook.remove();
    myLibrary.splice(e.target.dataset.num, 1);
    window.localStorage.setItem(`books`, JSON.stringify(myLibrary));
}
function clear() {
    window.localStorage.clear();
    myLibrary = [];
    const template = document.querySelectorAll('.template');
    template.forEach(element => element.remove());
}
