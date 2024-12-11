const { useState, useEffect, useCallback } = React
import { bookService } from '../services/book.service.js'
import { debounce } from '../services/util.service.js'

export function BookAdd() {
    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState([])
    const [error, setError] = useState(null)

    // Wrap the API call in debounce
    const debouncedSearch = useCallback(
        debounce((term) => {
            if (!term) {
                setResults([])
                return
            }
            bookService.queryGoogleBooks(term)
                .then((googleBooks) => {
                    setResults(googleBooks)
                })
                .catch((err) => {
                    console.error('Error fetching books from Google Books API', err)
                    setError('Failed to fetch books. Please try again later.')
                })
        }, 1000), // Debounce delay (1 second)
        []
    )

    function handleChange({ target }) {
        console.log(target);
        
        const { value } = target
        setSearchTerm(value)
        debouncedSearch(value) // Call the debounced function
    }

    async function handleAddBook(googleBook) {
        try {
            await bookService.addGoogleBook(googleBook)
            alert(`Book: "${googleBook.title}" has been added successfully!`)
        } catch (err) {
            console.error('Error adding book to database', err)
            alert('Failed to add the book. It may already exist in the database.')
        }
    }

    return (
        <section className="book-add">
            <h1>Search for Books</h1>
            <input
                type="text"
                placeholder="Search for a book..."
                value={searchTerm}
                onChange={handleChange}
            />
            {error && <p className="error-msg">{error}</p>}
            <ul>
                {results.map((book) => (
                    <li key={book.id}>
                        {book.title}
                        <button onClick={() => handleAddBook(book)}>+</button>
                    </li>
                ))}
            </ul>
        </section>
    )
}
