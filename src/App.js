import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  /**
  * @description BooksAPI.getAll() returns collection of book objects currently in the bookshelves
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  /**
  * @description Updates selected book shelf
  * @param {object} Book - Selected book object
  * @param Selected shelf
  */
  updateBook(bookSelected, value) {
    console.log("app / updateBook")
    this.state.books.filter((book) => {
      if (book.id === bookSelected.id) {
        // Update book shelf value in database
        BooksAPI.update(book, value).then()
        // Set new shelf value and send book to that shelf
        book.shelf = value
        this.setState(state => {
          return undefined

        })
      }
    })
  }

  /**
  * @description Updates Dropdown menu none removes selected book from the shelf and from state.books array
  * @param {object} Book - Selected book object to remove
  */
  removeBook(bookToRemove) {
    console.log("app / removeBook")
    console.log(this.state.books)
    // Remove book from state.book array
    const i = this.state.books.indexOf(bookToRemove)
    this.state.books.splice(i, 1)
    // Update book shelf value to none in database
    BooksAPI.update(bookToRemove, "none").then()
    // Remove book from the shelf
    bookToRemove.shelf = "none"
    console.log(this.state.books)
    this.setState(state => {return undefined})
  }

  /**
  * @description Check if the book is alredy in state.books, if it's not, add the book from search to state.books
  * @param {object} bookSelected - Selected book object
  */
  addNewBook(bookSelected, shelf) {
    console.log("app / addNewBook")
    console.log(this.state.books)
    console.log(bookSelected)
    let comparedBooks = false
    this.state.books.map(book => {
      if (book.id === bookSelected.id ) {
        comparedBooks = true
        book.shelf = shelf
      }
    })
    if (!comparedBooks) {
      bookSelected.shelf = shelf
      this.state.books.push(bookSelected)
    }    
    console.log(this.state.books)

  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Bookshelf
            // Passing a list of props into ListContacts component
            books={this.state.books}
            onRemoveBook={(book) => {
              this.removeBook(book)
            }}
            onUpdateBook={(book, value) => {
              this.updateBook(book, value)
            }}
          />
        )}/>
        <Route path="/search" render={ ({history}) => (
          <Search
            books={this.state.books}
            onAddNewBook={(book, shelf) => {
              this.addNewBook(book, shelf)
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
