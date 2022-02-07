import React from 'react'

const Total = ({ parts }) => {
  const exercises = parts.map(part => part.exercises)
  const total = exercises.reduce((sum, exercise) => sum + exercise)

  return(
    <div>
      <b>total of {total} exercises </b>
    </div>
  )

}

export default Total