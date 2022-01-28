import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Votes = ({ number }) => {
  return (
    <div>has {number} votes</div>
  )
  
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  // random number generator
  // needed to establish the first selected anecdote and
  // for the 'next anecdote' button
  const generateRandomNumber = () => {
    return( Math.floor(Math.random() * anecdotes.length ))
  }

  const [selected, setSelected] = useState(generateRandomNumber)

  // state of points'array filled with 0
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  // state to select the max value from 'points' array
  const [maxVote, setMaxVote] = useState(Math.max(...points))

  // function to vote: it changes the points value of the anecdote
  // and re-states the max value
  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    setMaxVote(Math.max(...copy))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <Votes number={points[selected]} />
      <Button handleClick={voteAnecdote} text="vote"/>
      <Button handleClick={() => setSelected(generateRandomNumber)} text="next anecdote"/>

      <h1>Anecdote with most votes</h1>
      <div>
        {anecdotes[points.indexOf(maxVote)]}
      </div>
      <Votes number={maxVote} />
    </div>
  )
}

export default App