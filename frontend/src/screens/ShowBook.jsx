import React from 'react'
import CardDetail from '../components/CardDetail'
import Comments from '../components/Comment'

export default function ShowBook() {
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <CardDetail></CardDetail>
      <Comments></Comments>

    </div>
  )
}
