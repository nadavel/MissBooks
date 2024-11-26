
export function BookPreview({book}){
    return (
        <section className="book-preview">
            <img src={book.thumbnail} alt="" />
            <h2>Title: {book.title}</h2>
            <h3>Authors: {book.authors.join(', ')}</h3>
            <h4>Price: {`${book.listPrice.amount} ${book.listPrice.currencyCode}`}</h4>
        </section>
    )
}