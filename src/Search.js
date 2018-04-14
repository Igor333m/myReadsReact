import React, { Component } from 'react'
import { Link  } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class Search extends Component {

  static PropTypes = {
    books:PropTypes.array.isRequired,
    onAddNewBook:PropTypes.object.isRequired
  }

  state = {
    query: [],
    books: this.props.books
  }

  /**
  * @description Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
  * @param {string} query - Query from search bar
  * @returns {array} of books
  */
  searchBook(query) {
    if (query) {
      BooksAPI.search(query).then(books => {
        this.state.books.map(book => {
          books.map(qBook => {
            // Set all shelfs to none
            if (!qBook.shelf) {
              qBook.shelf = 'none'
            }
            // Sets thumbnails for books without it
            if ( !qBook.imageLinks) {
              console.log('thumbnail')
              qBook.imageLinks = {}
              qBook.imageLinks.thumbnail = 'http://via.placeholder.com/128x193'
            }
            // Check if book is on the shelf 
            if (book.id === qBook.id) {
              console.log('qBook.shelf = book.shelf')
              qBook.shelf = book.shelf
            }
          })
        })
        this.setState((prevState) => {
          return { query: books }
        })
      }).catch( (reason) => {
        console.log(`Handle rejected promise ${reason} here.`)
        //this.clearQuery()
      })
    } else {
      this.clearQuery()
    }    
  }

  /**
  * @description Sets query to empty state
  */
  clearQuery = () => {
    this.setState((prevState) => {
      return { query: [] }
    })
  }

  /**
  * @description Collect book object and value from dropdown menu (currentlyReading, wantToRead, read)
  * @param {object} Book - Selected book object
  * @param event 
  */
  handleChange = (book, event) => {
    event.preventDefault()
    console.log('Search / handleChange')
    console.log(event.target.value)
    const e = event.target.value
    this.props.onAddNewBook(book, e)
  }

  render() {
    
    // Holds search query
    let showBooks
    
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text"
            autoFocus
            placeholder="Search by title or author"
            value={showBooks}
            onChange={(event) => this.searchBook(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.state.query.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select value={ book.shelf } onChange={ (e) => this.handleChange(book, e)}>
                        <option value="moveTo" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{ book.title }</div>
                  <div className="book-authors">{ book.authors }</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search