import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

export function BookReview() {
    const [isReviewed, setIsReviewed] = useState(false)
    const [reviews, setReviews] = useState([])
    const [userReview, setUserReview] = useState({
        fullname: '',
        readAt: '',
        rating: '',
        txt: '',
    })
    const { bookId } = useParams()

    const ratings = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐']

    useEffect(() => {
        setIsReviewed(false)
        
        bookService.getReviews(bookId)
            .then((fetchedReviews) => {
                setReviews(fetchedReviews)
            })
            .catch((err) => console.error("Error fetching reviews:", err))
    }, [bookId])

    function onSaveReview(ev) {
        ev.preventDefault()
        bookService.addReview(bookId, userReview)
            .then(() => {
                bookService.getReviews(bookId).then(setReviews)
                setIsReviewed(true)
                showSuccessMsg('Review added successfully')
            })
            .catch((err) => {
                console.error("Error saving review:", err)
                showErrorMsg('Failed to add review')
            })
    }

    function handleChange({ target }) {
        let { value, name: field } = target;

        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value; // Convert to number
                break
            case 'checkbox':
                value = target.checked; // Boolean for checkboxes
                break
        }

        setUserReview((prevReview) => ({ ...prevReview, [field]: value }))
        console.log('Updated Review:', userReview); // Debugging
    }

    return (
        <section className="book-review">
            {!isReviewed && (
                <div className="review-form">
                    <h2>Add a review</h2>
                    <form onSubmit={onSaveReview} className="user-review">
                        <div className="form-first-row">
                            <label htmlFor="fullname">Full Name: </label>
                            <input onChange={handleChange} type="text" name="fullname" id="fullname" />
                            <label htmlFor="readAt">Read At: </label>
                            <input onChange={handleChange} type="date" name="readAt" id="readAt" />
                            <label htmlFor="rating">Rating: </label>
                            <select onChange={handleChange} name="rating" id="rating">
                                <option value="">Select a rating</option>
                                <option value="1">⭐</option>
                                <option value="2">⭐⭐</option>
                                <option value="3">⭐⭐⭐</option>
                                <option value="4">⭐⭐⭐⭐</option>
                                <option value="5">⭐⭐⭐⭐⭐</option>
                            </select>
                        </div>
                        <div className="form-second-row">
                            <label htmlFor="review">Review: </label>
                            <textarea onChange={handleChange} name="txt" id="review"></textarea>
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            )}
            <ul className="review-list">
                {reviews.length === 0 ? (
                    <p>No reviews yet. Be the first to review this book!</p>
                ) : (
                    reviews.map((review, idx) => (
                        <li key={idx}>
                            <div className="review-head">
                                <h4>{review.fullname}</h4>
                                <h4>{review.readAt}</h4>
                            </div>
                            <h4>{ratings[review.rating - 1]}</h4>
                            <h2>{review.txt}</h2>
                        </li>
                    ))
                )}
            </ul>
        </section>
    )
}
