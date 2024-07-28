import React from 'react'
import './Button.css'
export default function Button({submit,text}) {
  return (
   <div className='button'onClick={submit}>{text}</div>
  )
}
