import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BookIndex(){

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks(){
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => console.log("We ran into a problem", err)
            )
    }

    function onRemoveBook(bookId){
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.Id !== bookId))
            })
            .catch(err => {
                console.log("We ran into a problem", err);
                
            })
            
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({...prevFilter, ...filterBy}))
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            <BookFilter defaultFilter={filterBy} onSetFilter={onSetFilter} />
            <section>
                <Link to="/book/edit">Add Book</Link>
            </section>
            <BookList books={books} onRemoveBook={onRemoveBook}/>
        </section>
    )
}