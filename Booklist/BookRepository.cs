using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Booklist
{
    public class BookRepository : IBookRepository
    {
        private List<Book> books = new List<Book>();
        private int _nextId = 1;

        public BookRepository()
        {
            Add(new Book { Title = "test2", Author = "joku" });
            Add(new Book { Title = "test3", Author = "testing" });
            Add(new Book { Title = "test4", Author = "testaaja" });
        }
        public Book Get(int id)
        {
            return books.Find(p => p.Id == id);
        }
        public IEnumerable<Book> GetAll()
        {
            return books;
        }
        public Book Add(Book book)
        {
            if (book == null)
            {
                throw new ArgumentNullException("book");
            }
            book.Id = _nextId++;
            books.Add(book);
            return book;
        }
        public void Remove(int id)
        {
            books.RemoveAll(p => p.Id == id);
        }
        public bool Update(Book book)
        {
            if (book == null)
            {
                throw new ArgumentNullException("item");
            }
            int index = books.FindIndex(p => p.Id == book.Id);
            if (index == -1)
            {
                return false;
            }
            books.RemoveAt(index);
            books.Add(book);
            return true;
        }
    }
}
