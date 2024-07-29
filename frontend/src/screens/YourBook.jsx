import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Card from '../components/card';

export default function YourBooks() {
  let [books,setBooks] = useState([]);
  let userEmail = localStorage.getItem('userEmail')
  useEffect( ()=>{
    const fetchBooks =async()=>{
        const response = await axios.get('http://localhost:8080/book/published',{
          params:{
             email: userEmail
          }
        })

        setBooks(response.data)
    }
    fetchBooks();
  },[])
  return (
    <div className="books">
        <h4>Your Books!</h4>
             <div className="cards-list" style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", flexWrap: 'wrap', padding:"3rem" }}>
     
       
     {books.length>0 ?(
     books.map((book,index) =>{
       const isbn = Math.floor(Math.random()*10000);
       return(
       <Card 
       key={index}
       isbn ={isbn}
       title={book.title}
       authorName={book.author ? book.author : 'Unknown Author'}
       image={book.coverImage}
       publisher={book.publisher?book.publisher:'Unknown'}
       />
       )
       
     })
   ):(
       <p>You haven't Created any Books</p>
   )

     }
   </div>
    </div>
   
  )
}