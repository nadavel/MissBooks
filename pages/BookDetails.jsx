import { bookService } from '../services/book.service.js'
const  { useEffect, useState } = React
const { Link, useParams, useNavigate } = ReactRouterDOM
import { BookReview } from './BookReview.jsx'

export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    async function loadBook() {
        try {
            const fetchedBook = await bookService.get(params.bookId)
            setBook(fetchedBook)
        } catch (err) {
            console.error('Error in getting book', err)
        }
        
    }

    if (!book) return <div>Loading...</div>

    const {
        title,
        subtitle,
        authors,
        publishedDate,
        description,
        pageCount,
        categories,
        thumbnail,
        language,
        listPrice
    } = book

    // Compute pageBadge and dateBadge inline
    let pageBadge
    if (pageCount > 500) {
        pageBadge = 'Serious Reading'
    } else if (pageCount > 200) {
        pageBadge = 'Decent Reading'
    } else if (pageCount < 100) {
        pageBadge = 'Light Reading'
    }

    let dateBadge;
    const currentYear = new Date().getFullYear()
    const bookAge = currentYear - publishedDate
    if (bookAge > 10) {
        dateBadge = 'Vintage'
    } else if (bookAge < 1) {
        dateBadge = 'New'
    }

    function onBack() {
        navigate('/book')
    }

    

    return (
        <section className="book-details-container">
            <button className="navigate-btn prev-btn"><Link to={`/book/${book.prevbookId}`}>&lt;</Link></button>
            <div className="book-main">
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <h3>Authors: {authors.join(', ')}</h3>
                <img src={thumbnail} alt={`Cover of ${title}`} className="book-thumbnail" />
                <div className="badges-container">
                    {pageBadge && <span className="badge page-badge">{pageBadge}</span>}
                    {dateBadge && <span className="badge date-badge">{dateBadge}</span>}
                    {listPrice.isOnSale && <span className="badge">On Sale!</span>}
                </div>
                <p>Description: {description}</p>
                <p>Page Count: {pageCount}</p>
                <h4>Published Date: {publishedDate}</h4>
                <p>Categories: {categories.join(', ')}</p>
                <p>Language: {language}</p>
                <div className="price-info">
                    <h4 className={`price ${listPrice.amount > 150 ? 'price-high' : listPrice.amount < 20 ? 'price-low' : ''}`}>Price: {`${listPrice.amount} ${listPrice.currencyCode}`}</h4>
                </div>
                <div className="navigate-pages">
                    <button className="navigate-btn" onClick={onBack}>Back</button>
                    <button className="navigate-btn"><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
                </div>
            </div>
            {/* <BookReview bookId={book.id} /> */}
            <button className="navigate-btn next-btn"><Link to={`/book/${book.nextbookId}`}>&gt;</Link></button>
        </section>
    )
}