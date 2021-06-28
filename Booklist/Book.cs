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
    }
}
