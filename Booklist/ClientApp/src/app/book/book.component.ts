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
  selectedBook: Book;
 
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.getBooks();
  }
  selectedBookTitle: string = "";
  selectedBookAuthor: string = "";
  selectedBookDescription: string = "";
  selectedbookId: number;
  getBooks(): Subscription {
    return this.http.get<Book[]>(this.baseUrl + 'api/').subscribe(result => {
      this.books = result;
    });
  }
  selectBook(selectedBook: Book): void {

    this.selectedBook = selectedBook;
    this.selectedBookTitle = selectedBook.title;
    this.selectedBookAuthor = selectedBook.author;
    this.selectedBookDescription = selectedBook.description;
  }
  deleteBook(selectedBook: Book): void {
    this.http.delete(this.baseUrl + 'api/' + selectedBook.id).subscribe(result => {
      this.books = this.books.filter(book => book !== selectedBook);
    }, error => console.error(error
    ));
  }

  addBook(): Subscription {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify({
      title: this.selectedBookTitle,
      author: this.selectedBookAuthor,
      description: this.selectedBookDescription
    });

    return this.http.post<Book>(this.baseUrl + 'api/', body, { 'headers': headers }).subscribe(result => {
      this.books.push(result);
    });
  }
  saveBook(): Subscription {
  
    const headers = { 'content-type': 'application/json' }
    const body = ({
      title: this.selectedBookTitle,
      author: this.selectedBookAuthor,
      description: this.selectedBookDescription
    });
    return this.http.put<Book>(this.baseUrl + 'api/' + this.selectedBook.id, body, { 'headers': headers }).subscribe(result => {

      var bookIndex = this.books.findIndex(p => p.id == this.selectedBook.id);
      this.books[bookIndex].title = this.selectedBookTitle;
      this.books[bookIndex].author = this.selectedBookAuthor;
      this.books[bookIndex].description = this.selectedBookDescription;


    })
  }
}
interface Book {
  title: string;
  author: string;
  description: string
  id: number;

}
