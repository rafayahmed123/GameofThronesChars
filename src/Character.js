import React from 'react';
import reactDom from 'react-dom';
import './style.css';


function editString(books){                                     //function which returns the book numbers which the character is in
    const booksbyNumber = books.map(book => {                   //mapping array of books to new array which only contains the book number
        if (isNaN(parseInt(book.slice(-2,-1))) === false)       //checking for double digit books (10,11)
        {
            return book.slice(-2)
        }
        else{
            return book.slice(-1)
        }
    })
    return booksbyNumber
}

function Character(props){                              //function which returns characters as a component along with their corresponding info to be used in App.js
    return (
        <div className="charInfo">
            <p className="name"> {props.name == "" ?  props.aliases[0] : props.name }</p>
            <p className="culture"> {props.culture== "" ? null : props.culture} </p>
            <p> {props.born== "" ? null : "Born " + props.born}</p>
            <p> {props.died == "" ? null : "Died " + props.died}</p>
            <p style={{fontWeight:"bold"}}> {props.books == [] ? null : "Appeared in books " + editString(props.books)}</p>
        </div>
    );
}

export default Character;