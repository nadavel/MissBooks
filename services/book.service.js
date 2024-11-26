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
                books = books.filter(book => regExp.test(book.vendor))
            }

            if (filterBy.minSpeed) {
                books = books.filter(book => book.maxSpeed >= filterBy.minSpeed)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(DB_KEY, bookId)
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

function getDefaultFilter(filterBy = { txt: '', minSpeed: 0 }) {
    return { txt: filterBy.txt, minSpeed: filterBy.minSpeed }
}

function _createBooks() {
    let loadedBooks = utilService.loadFromStorage(DB_KEY)
    if (!loadedBooks || !loadedBooks.length) {
        //books = []
        // const vendors = ['audu', 'fiak', 'subali', 'mitsu']
        // for (let i = 0; i < 6; i++) {
        //     const vendor = vendors[utilService.getRandomIntInclusive(0, vendors.length - 1)]
        //     books.push(_createBook(vendor, utilService.getRandomIntInclusive(80, 300)))
        // }
        utilService.saveToStorage(DB_KEY, books)
    }
}

function _createBook(vendor, maxSpeed = 250) {
    const book = getEmptyBook(vendor, maxSpeed)
    book.id = utilService.makeId()
    return book
}
