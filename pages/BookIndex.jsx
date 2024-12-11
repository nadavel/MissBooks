import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { getTruthyValues } from "../services/util.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function BookIndex(){
    const [searchParams, setSearchParams] = useSearchParams()
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSrcParams(searchParams))

    useEffect(() => {
        setSearchParams(getTruthyValues(filterBy))
        loadBooks()
    }, [filterBy])

    function loadBooks(){
        
        bookService.query(filterBy)
            .then(books => {                
                setBooks(books)
                showSuccessMsg('Books loaded successfully!')
            })
            .catch(err => console.log("We ran into a problem", err)
            )
    }

    function onRemoveBook(bookId){
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
                showSuccessMsg('Book removed successfully')
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
            <section className="addButton">
                <button><Link to="/book/edit">Add Book</Link></button>
            </section>
            <BookList books={books} onRemoveBook={onRemoveBook}/>
        </section>
    )
}