import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"

const { useState, useEffect } = React

export function BookIndex(){

    const [books, setBooks] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks(){
        bookService.query()
            .then(setBooks)
            .catch(err => console.log("We ran into a problem", err)
            )
    }

    function onRemoveBook(bookId){
        bookService.remove(bookId)
            
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            <BookList books={books} onRemoveBook={onRemoveBook}/>
        </section>
    )
}