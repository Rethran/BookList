using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Booklist
{
    public class Book
    {

        private string _title;
        private string _author;
        private string _description;
        private int _id;
        public List<Book> bookList = new List<Book>();

        public Book()
        {
            bookList = new List<Book>();
        }


        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public string Title
        {
            get { return _title; }
            set { _title = value; }
        }
        public string Author
        {
            get { return _author; }
            set { _author = value; }
        }
        public string Description
        {
            get { return _description; }
            set { _description = value; }
        }

        public void AddBook(Book book)
        {
            book.Id = bookList.Count > 0 ? bookList.Max(x => x.Id) + 1 : 1;
            bookList.Add(book);
        }
        public void RemoveBook(Book oldBook)
        {
            bookList.Remove(oldBook);
            bookList.ForEach((x) => { if (x.Id > oldBook.Id) x.Id -= 1; });
        }
        public void getSingleBook(int id)
        {

            var item = bookList.Find(x => x.Id == id);

        }
    }
}
