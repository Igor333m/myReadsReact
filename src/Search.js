import React, { Component } from 'react'
import { Link  } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Search extends Component {

  state = {
    query: []
  }

  /**
  * @description Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
  * @param {string} query - Query from search bar
  * @returns {array} 
  */
  searchBook(query) {
    console.log(query)
    if (query) {
      BooksAPI.search(query).then(books => {
        this.setState({ query: books })
        console.log(typeof this.state.query)
      }).catch( (reason) => {
        console.log(`Handle rejected promise ${reason} here.`)
        this.clearQuery()
      })
    } else {
      this.clearQuery()
    }
    
  }

  clearQuery = () => {
    this.setState({ query: [] })
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
                            <select onChange={ (e) => this.handleChange(book, e)}>
                              <option value="none"disabled>Move to...</option>
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