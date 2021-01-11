//BOOK CONSTRUCTOR
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI CONSTRUCTOR 
function UI(){
    
}

//Add Book to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr');
    //Insert columns into the tr element
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href = "#" class = "delete">x</a></td>
    `;

    list.appendChild(row);
}

//Error Message PopUp
UI.prototype.showAlert = function(message, className){
    //Create a div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add Text
    div.appendChild(document.createTextNode(message))
    //Get container
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    //Insert alert
    container.insertBefore(div, form);

    //Timeout after 3secs
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
};

//Delete Book
UI.prototype.deleteBook = function(target){
    if(target.className == 'delete'){
        target.parentElement.parentElement.remove()
    }
}

//Clear fields prototype
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//EVENT LISTENER FOR ADD BOOK
document.getElementById('book-form').addEventListener('submit', function(e){
    //Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;


    //Instantiating a book
    const book = new Book(title, author, isbn);

    //Instantiating UI
    const ui = new UI()

    //Validation
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill all the necessary fields', 'error')
    }else{
        //Add book to list
        ui.addBookToList(book);

        //Show success if book is added to the list
        ui.showAlert(`${book.title} has been successfully added to your book list.`, 'success')

        //Clear fields
        ui.clearFields();
    }

    e.preventDefault()
})


//EVENT LISTENER FOR DELETE BOOK
document.getElementById('book-list').addEventListener('click', function(e){

    //Instatiate UI
    const ui = new UI();

    //Delete the book
    ui.deleteBook(e.target);

    //Show message
    ui.showAlert(`${book.title} has been removed successfully.`, 'success');
    
    e.preventDefault();
})