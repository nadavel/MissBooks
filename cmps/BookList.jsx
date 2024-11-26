import { BookPreview } from "./BookPreview.jsx";

const { Link } = ReactRouterDOM

export function BookList({books, onRemoveBook}){
    return (
        <ul className="book-list">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book}/>
                    <section>
                        <button onClick ={() => onRemoveBook(book.Id)}>Remove</button>
                        <button><Link to={`/book/${book.Id}`}>Details</Link></button>
                        <button><Link to={`/book/edit/${book.Id}`}>Edit</Link></button>
                    </section>

                </li>
            )}
        </ul>
    )
}