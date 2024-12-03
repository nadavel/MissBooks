import { bookService } from '../services/book.service.js'
const  { useEffect, useState } = React
const { Link, useParams, useNavigate } = ReactRouterDOM


export function BookEdit(){
    const [book, setBook] = useState(bookService.getEmptyBook())
    const {bookId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(bookId)
            loadBook()
    }, [])

    async function loadBook() {
        try {
            const fetchedBook = await bookService.get(bookId)
            setBook(fetchedBook)
        } catch (err) {
            console.error('Error in getting book', err)
        }
        
    }

    function handleChange({ target }) {
        let { value, name: field } = target;
        switch (target.type) {
            case 'number':
                value = +target.value;
                break;
            case 'checkbox':
                value = target.checked;
                break;
        }
        // handle array fields
        if (field === 'authors' || field === 'categories') {
            value = value.split(',').map((item) => item.trim());
        }

        // Handle nested listPrice fields
        if (field.startsWith('listPrice.')) {
            const key = field.split('.')[1];
            setBook((prevBook) => ({
                ...prevBook,
                listPrice: {
                    ...prevBook.listPrice,
                    [key]: value,
                },
            }));
        } else {
            setBook((prevBook) => ({ ...prevBook, [field]: value }));
        }
    }

    //if (!book) return <div>Loading...</div>

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
        listPrice,
    } = book


    function onNavigate(str='') {
        let destination = `/book/edit${str}`
        navigate(destination)
    }

    function onSaveBook(ev){
        ev.preventDefault()
        bookService.save(book)
        .then(() => navigate('/book'))
        .catch(err => {
            console.log('Cannot save!', err)
        })
    }

    

    return (
        <section className="book-edit-container">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook} className="book-form">
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} type="text" className="form-input" value={title} name="title" id="title"/>
                <label htmlFor="subtitle">Subtitle</label>
                <input onChange={handleChange} type="text" className="form-input" value={subtitle} name="subtitle" id="subtitle"/>
                <label htmlFor="authors">Authors</label>
                <input onChange={handleChange} type="text" className="form-input" value={authors} name="authors" id="authors" placeholder="Separated by '',''"/>
                <label htmlFor="description">Description</label>
                <input onChange={handleChange} type="text" className="form-input" value={description} name="description" id="description"/>
                <label htmlFor="publishedDate">Published Year</label>
                <input onChange={handleChange} type="text" className="form-input" value={publishedDate} name="publishedDate" id="publishedDate"/>
                <label htmlFor="pageCount">No. of pages</label>
                <input onChange={handleChange} type="text" className="form-input" value={pageCount} name="pageCount" id="pageCount"/>
                <label htmlFor="categories">Categories</label>
                <input onChange={handleChange} type="text" className="form-input" value={categories} name="categories" id="categories" placeholder="Separated by '',''"/>
                <label htmlFor="thumbnail">Book cover</label>
                <input onChange={handleChange} type="text" className="form-input" value={thumbnail} name="thumbnail" id="thumbnail" placeholder="Picture URL"/>
                <label htmlFor="language">Language</label>
                <input onChange={handleChange} type="text" className="form-input" value={language} name="language" id="language"/>
                <label htmlFor="listPrice">Price</label>
                <input onChange={handleChange} type="text" className="form-input" value={listPrice.amount} name="listPrice.amount" id="listPrice.amount"/>
                <label htmlFor="isOnSale">Is on sale?</label>
                <input onChange={handleChange} type="checkbox" className="form-input" checked={listPrice.isOnSale} name="listPrice.isOnSale" id="listPrice.isOnSale"/>
                <button className="save-button">Save</button>
            </form>
        </section>
    )
}

