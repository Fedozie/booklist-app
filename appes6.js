//BOOK CONSTRUCTOR FUNCTION CLASS
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    } 
}

//UI CONSTRUCTOR FUNCTION CLASS
class UI{
    constructor(){

    }

    //Adding a book to the list
    addBookToList(book){
        const list = document.getElementById('book-list');
        //Create tr element
        const row = document.createElement('tr')
        //Insert columns into the row
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">x</a></td>
        `;

        list.appendChild(row);
    }

    //Alert messages when books are added or when there are errors
    showAlert(message, className){
        //Create a div
        const div = document.createElement('div');
        //Add Classes
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
            document.querySelector('.alert').remove()
        }, 3000)
    }

    //Deleting a book from the list
    deleteBook(target){
        if(target.className == 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    //After submiting the form
    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}


//EVENT LISTENER FOR ADDING BOOKS
document.getElementById('book-form').addEventListener('submit', function(e){
    //Declare form variables
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    //Instantiate a book
    const book = new Book(title, author, isbn);

    //Instantiating UI
    const ui = new UI()

    //Validation
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill all the necessary fields.', 'error')
    }else{
        //Adding a book to the list
        ui.addBookToList(book);

        //Show success if a book is added to the list
        ui.showAlert(`${book.title} has been successfully added to your book list.`, 'success');

        //Clear fields
        ui.clearFields();
    }
    
    e.preventDefault();
})

//EVENT LISTENER FOR DELETING BOOK
document.getElementById('book-list').addEventListener('click', function(e){
    
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();

    //Delete the book
    ui.deleteBook(e.target);
    
    //Show delete message
    ui.showAlert(`${e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent} has been removed successfully.`, 'success');

    e.preventDefault();
})
