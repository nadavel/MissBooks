import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { books } from '../books.js'

const DB_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}

// For Debug (easy access from console):
// window.cs = bookService

function query(filterBy = {}) {
    return storageService.query(DB_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            if (filterBy.publishedDate) {
                books = books.filter(book => book.publishedDate >= filterBy.publishedDate)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(DB_KEY, bookId)
        .then(_setNextPrevBookId)
}

function remove(bookId) {
    return storageService.remove(DB_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(DB_KEY, book)
    } else {
        return storageService.post(DB_KEY, book)
    }
}

function getEmptyBook(vendor = '', maxSpeed = '') {
    return { vendor, maxSpeed }
}

function getDefaultFilter(filterBy = { txt: '', publishedYear: 0 }) {
    return { txt: filterBy.txt, publishedYear: filterBy.publishedYear }
}

function _setNextPrevBookId(book){
    return query().then((books) => {
        const bookIdx = books.findIndex((currbook) => currbook.id === book.id)
        const nextbook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevbook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextbookId = nextbook.id
        book.prevbookId = prevbook.id
        return book
    })
}

function _createBooks() {
    let loadedBooks = utilService.loadFromStorage(DB_KEY)
    if (!loadedBooks || !loadedBooks.length) {
        utilService.saveToStorage(DB_KEY, books)
    }
}

function _createBook(vendor, maxSpeed = 250) {
    const book = getEmptyBook(vendor, maxSpeed)
    book.id = utilService.makeId()
    return book
}
