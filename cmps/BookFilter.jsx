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
        setFilterBy((prevFilter) => {
            const updatedFilter = { ...prevFilter, [field]: value }
            if (field === 'isOnSale') {
                updatedFilter.listPrice = { ...prevFilter.listPrice, isOnSale: value }
            }
            return updatedFilter
        })
    }

    function updateYearRange(){
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
    console.log(filterBy);
    
    const { txt, publishedDate = minYear, authors, listPrice = {} } = filterBy
    const { isOnSale = false } = listPrice
    return (
        <section className="book-filter">
            <h2>Filter books</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Search by title</label>
                <input value={txt} onChange={handleChange} type="text" name="txt" id="txt" />
                <label htmlFor="publishedDate">Search by year</label>
                <div className="range-container">
                    <input value={publishedDate || ''} onChange={handleChange} type="range" min={minYear} max={maxYear} name="publishedDate" id="publishedDate" />
                    <span className="range-value">{publishedDate}</span>
                </div>
                <label htmlFor="authors">Search by author</label>
                <input value={authors} onChange={handleChange} type="text" name="authors" id="authors" />
                <label htmlFor="isOnSale">On sale</label>
                <input checked={isOnSale} onChange={handleChange} type="checkbox" name="isOnSale" id="isOnSale" />
                <button>Submit</button>
            </form>
        </section>
    )
}