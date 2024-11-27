import { bookService } from "../services/book.service.js";
import { debounce } from "../services/util.service.js";

const { useState, useEffect, useRef } = React

export function BookFilter({ defaultFilter, onSetFilter }) {

    const [filterBy, setFilterBy] = useState(defaultFilter)
    const [minYear, setMinYear] = useState(0)
    const [maxYear, setMaxYear] = useState(0)
    const onSetFilterDebounce = useRef(debounce(onSetFilter)).current


    useEffect(() => {
        onSetFilterDebounce(filterBy)
    }, [filterBy])

    useEffect(() => {
        updateYearRange();
    }, [])

    function handleChange({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function updateYearRange(){
        debugger
        bookService.query()
            .then((books) => {
                var years = books.map(book => book.publishedDate)
                
                setMinYear(Math.min(...years))
                setMaxYear(Math.max(...years))
                
                
        })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterBy)
    }

    const { txt, publishedDate } = filterBy
    return (
        <section className="book-filter">
            <h2>Filter books</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Search by title</label>
                <input value={txt} onChange={handleChange} type="text" name="txt" id="txt" />
                <label htmlFor="publishedDate">Search by year published year</label>
                <div className="range-container">
                    <input value={publishedDate} onChange={handleChange} type="range" min={minYear} max={maxYear} name="publishedDate" id="publishedDate" />
                    <span className="range-value">{publishedDate}</span>
                </div>
                <button>Submit</button>
            </form>
        </section>
    )
}