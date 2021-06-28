import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Subscription } from 'rxjs';



@Component({
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'
  ]
})
export class BookComponent {
  public books: Book[];
  public book: Book;
  selectedBook: Book;
  currentlyEditedBook: Book;
  currentlyEditedBookTitle: string = "";
  currentlyEditedBookAuthor: string = "";
  currentlyEditedBookDescription: string = "";
  currentlyEditedBookId: number;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.getAllBooks();
  }
  selectedBookTitle: string = "";
  selectedBookAuthor: string = "";
  selectedbookId: number;
  getAllBooks(): Subscription {
    return this.http.get<Book[]>(this.baseUrl + 'api/').subscribe(result => {
      this.books = result;
    });
  }
  onEdit(selectedBook: Book) {

    this.selectedBook = selectedBook;
    this.selectedBookTitle = selectedBook.title;
    this.selectedBookAuthor = selectedBook.author;
    this.currentlyEditedBook = selectedBook;
    console.log(selectedBook);
  }
  OnDelete(selectedBook: Book): void {
    this.http.delete(this.baseUrl + 'api/' + selectedBook.id).subscribe(result => {
      this.books = this.books.filter(book => book !== selectedBook);
      console.log(result);
      console.log('did this deleted the book' + selectedBook);

    }, error => console.error(error
    ));
  }

  addBook(): Subscription {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify({
      title: this.selectedBookTitle,
      author: this.selectedBookAuthor
    });

    return this.http.post<Book>(this.baseUrl + 'api/', body, { 'headers': headers }).subscribe(result => {
      console.log(result);
      this.books.push(result);
    });
  }
  saveBook() {
    // currentlyEditedBook.title = (event.target as HTMLInputElement).value;
    //currentlyEditedBook.author = (event.target as HTMLInputElement).value;
    //currentlyEditedBook.description = (event.target as HTMLInputElement).value;
    const headers = { 'content-type': 'application/json' }
    console.log(this.selectedBookTitle)
    const body = ({
      title: this.selectedBookTitle,
      author: this.selectedBookAuthor
    });
    return this.http.put<Book>(this.baseUrl + 'api/' + this.selectedBook.id, body, { 'headers': headers }).subscribe(result => {

      var bookIndex = this.books.findIndex(p => p.id == this.selectedBook.id);
      this.books[bookIndex].title = this.selectedBookTitle;
      this.books[bookIndex].author = this.selectedBookAuthor;

    })
  }
}
interface Book {
  title: string;
  author: string;
  description: string
  id: number;

}
