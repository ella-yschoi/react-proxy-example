import './App.css';

import { createBook, getAllBooks } from './services/BookService';
import { createTodo, getAllTodos } from './services/TodoService'

import BookTable from './components/BookTable';
import CreateBook from './components/CreateBook';
import DisplayBoard from './components/DisplayBoard';
import Footer from './components/Footer';
import Header from './components/Header';
import TodoList from './components/TodoList'
import { useState } from 'react';

function App () {

  const [bookShelf, setBookShelf] = useState({});
  const [books, setBooks] = useState([]);
  const [numberOfBooks, setNumberBooks] = useState(0);
  const [todos, setTodos] = useState([]);

  const handleSubmit = () => {
      createBook(bookShelf)
        .then(() => {
          setNumberBooks(numberOfBooks+1);
      });
  }

  const getAllBook = () => {
    getAllBooks()
      .then(data => {
        setBooks(data);
        setNumberBooks(data.length);
      });
  }

  const getAllTodo = () => {
    getAllTodos()
      .then(data => {
        setTodos(data);
      });
  }
  
  const handleOnChangeForm = (e) => {
      let inputData = bookShelf;
      if (e.target.name === 'book') {
        bookShelf.book = e.target.value;
      } else if (e.target.name === 'category') {
        bookShelf.category = e.target.value;
      } else if (e.target.name === 'author') {
        bookShelf.author = e.target.value;
      }
      setBookShelf(inputData);
  }

  return (
    <div className="main-wrapper">
      <div className="main">
        <Header />
        <CreateBook 
          bookShelf={bookShelf}
          onChangeForm={handleOnChangeForm}
          handleSubmit={handleSubmit}
        />
        <DisplayBoard 
          numberOfBooks={numberOfBooks} 
          getAllBook={getAllBook} 
          getAllTodo={getAllTodo}
        />
        <BookTable books={books} />
        <TodoList todos={todos}/>
        <Footer />
      </div>
    </div>
  );
}

export default App;
