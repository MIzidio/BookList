class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	addBookToList(book) {
		const list = document.getElementById("book-list");
		const row = document.createElement("tr");
		row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
		list.appendChild(row);
	}

	clearFields() {
		document.getElementById("title").value = "";
		document.getElementById("author").value = "";
		document.getElementById("isbn").value = "";
	}

	deleteBook(target) {
		if (target.className === "delete") {
			target.parentElement.parentElement.remove();
		}
	}

	showAlert(message, className) {
		const alert = document.createElement("div");
		alert.className = `alert ${className}`;
		alert.innerHTML = message;

		const form = document.getElementById("book-form");
		const container = document.querySelector(".container");

		container.insertBefore(alert, form);

		setTimeout(function () {
			document.querySelector(".alert").remove();
		}, 3000);
	}
}

document.getElementById("book-form").addEventListener("submit", function (e) {
	const title = document.getElementById("title").value;
	const author = document.getElementById("author").value;
	const isbn = document.getElementById("isbn").value;

	const book = new Book(title, author, isbn);

	const ui = new UI();

	if (title === "" || author === "" || isbn === "") {
		ui.showAlert("Please fill in all fields", "error");
	} else {
		ui.addBookToList(book);
        ui.clearFields();
        ui.showAlert("Book has been added to the list", "success");
	}

	e.preventDefault();
});

document.getElementById("book-list").addEventListener("click", function (e) {
	const ui = new UI();

    ui.deleteBook(e.target);
    ui.showAlert('Book removed!', 'success');

	e.preventDefault();
});

