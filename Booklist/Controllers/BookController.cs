using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Booklist.Controllers
{
    [Route("api/")]
    [ApiController]

    public class BookController : ControllerBase
    {
        static readonly IBookRepository repository = new BookRepository();
        // GET: api/<Book2Controller>
        [HttpGet]

        public IEnumerable<Book> Get()
        {
            return repository.GetAll();
        }

        // GET api/<Book2Controller>/5

        [HttpGet("{id}")]
        public Book GetBook(int id)
        {
            Book item = repository.Get(id);
            return item;
        }

        // POST api/<Book2Controller>
        [HttpPost]
        public Book Post([FromBody] Book book)
        {
            book = repository.Add(book);
            return book;
        }

        // PUT api/<Book2Controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Book book)
        {
            book.Id = id;

            if (!repository.Update(book))
            {
                Console.WriteLine("there is error at updating book");
            }
        }

        // DELETE api/<Book2Controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Book item = repository.Get(id);
            if (item == null)
            {
                Console.WriteLine("item is null");
            }

            repository.Remove(id);
        }
    }
}
