import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Bookshelf extends Component {

	static PropTypes = {
		books: PropTypes.array.isRequired, 
		onUpdateBook:PropTypes.object.isRequired
	}
	
	/**
	* @description Collect book object and value from dropdown menu (currentlyReading, wantToRead, read)
	* @param {object} Book - Selected book object
	* @param event 
	*/
	handleChange = (book, event) => {
		event.preventDefault()

		this.props.onUpdateBook(book, event.target.value)
	}


	render() {

		let currentlyReading = this.props.books.filter(book => book.shelf === "currentlyReading")
		let wantToRead = this.props.books.filter(book => book.shelf === "wantToRead")
		let read = this.props.books.filter(book => book.shelf === "read")
		return(
			<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    	{currentlyReading.map((book) => (
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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    	{wantToRead.map( book => (
	                      <li key={book.id}>
	                        <div className="book">
	                          <div className="book-top">
	                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
	                            <div className="book-shelf-changer">
	                              <select onChange={ (e) => this.handleChange(book, e)}>
	                                <option value="none" disabled>Move to...</option>
	                                <option value="wantToRead">Want to Read</option>
	                                <option value="currentlyReading">Currently Reading</option>
	                                
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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    	{ read.map( book => (
												<li key={book.id}>
	                        <div className="book">
	                          <div className="book-top">
	                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
	                            <div className="book-shelf-changer">
	                              <select onChange={ (e) => this.handleChange(book, e)}>
	                                <option value="none" disabled>Move to...</option>
	                                <option value="read">Read</option>
	                                <option value="currentlyReading">Currently Reading</option>
	                                <option value="wantToRead">Want to Read</option>
	                                
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
              </div>
            </div>
            <div className="open-search">
              <Link to="/Search">Add a book</Link>
            </div>
          </div>
    )
	}
}

export default Bookshelf