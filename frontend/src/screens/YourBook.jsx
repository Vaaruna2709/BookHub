import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Card from '../components/card';
import { Link } from 'react-router-dom';
import Button from '../components/Button';


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
 
  let handleDeletion = async(book)=>{
    try{
      const response = await fetch(`http://localhost:8080/book/${book._id}?email=${userEmail}`,{
       
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
        },
       });
       const json = await response.json();
       if (json.success) {
       alert('Deleted Successfully')
       } else {
         alert('Try again');
       }
    }catch(error){
      console.error('Error:', error);
      alert('An error occurred');
    }
    
  }
  return (
    <div className="books">
        <h4>Your Books!</h4>
             <div className="cards-list" style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", flexWrap: 'wrap', padding:"3rem" }}>
     
        
     {books.length>0 ?(
     books.map((book,index) =>{
       const isbn = Math.floor(Math.random()*10000);
       
       return(
        <div className="card" key={index} style={{border:'2px solid black',borderRadius:'1rem',margin:'1rem'}} >
        <Card 
       
       isbn ={isbn}
       title={book.title}
       authorName={book.author ? book.author : 'Unknown Author'}
       image={book.coverImage}
       publisher={book.publisher?book.publisher:'Unknown'}
       />
        <Button submit={()=>handleDeletion(book)} text='delete'/>
        </div>
       
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