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
      this.setState({books})
    })
  }

  /**
  * @description Updates selected book shelf
  * @param {object} Book - Selected book object
  * @param Selected shelf
  */
  updateBook(bookSelected, value) {
    console.log("app")
    this.state.books.filter((book) => {
      if (book.id === bookSelected.id) {
        book.shelf = value
        this.setState(state => {
          console.log("app")
          return undefined
        })
        }
      }
    )
  }

  addNewBook(bookSelected) {
    console.log("app / addNewBook")
    console.log(this.state.books)
    console.log(bookSelected)
    let comparedBooks = false
    this.state.books.map(book => {
      if (book.id === bookSelected.id ) {
        comparedBooks = true
      }
    })
    if (!comparedBooks) {
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
            onUpdateBook={(book, value) => {
              this.updateBook(book, value)
            }}
          />
        )}/>
        <Route path="/search" render={ ({history}) => (
          <Search
            onAddNewBook={(book) => {
              this.addNewBook(book)
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
