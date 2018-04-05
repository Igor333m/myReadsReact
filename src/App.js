import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  /**
  * @description BooksAPI.getAll() returns collection of book objects currently in the bookshelves
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({books})
    })
  }

  /**
  * @description Updates selected book shelf
  * @param {object} Book - Selected book object
  * @param Selected shelf
  */
  updateBook(bookSelected, value) {
    this.state.books.filter((book) => {
      if (book.id === bookSelected.id) {
        book.shelf = value
        this.setState(state => {
          return undefined
        })
        }
      }
    )
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Bookshelf
            // Passing a list of props into ListContacts component
            books={this.state.books}
            onUpdateBook={(book, value) => {
              this.updateBook(book, value)
            }}
          />
        )}/>
        <Route path="/search" render={ ({history}) => (
          <Search />
        )}/>
      </div>
    )
  }
}

export default BooksApp
