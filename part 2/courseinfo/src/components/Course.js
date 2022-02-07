import React from 'react'
import Part from './Part'

const Course = ({ parts }) =>{
  
  return (
    <ul>
      {parts.map(part =>
        // <li key={part.id}>{part.name} {part.exercises}</li>  
        <Part key={part.id} part={part}/>
      )}
    </ul>
  )
}


export default Course