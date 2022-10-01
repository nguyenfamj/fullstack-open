import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];

  const generateRandomIndex = () => Math.floor(Math.random() * anecdotes.length);
  const [selected, setSelected] = useState(generateRandomIndex());
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const handleChangeText = () => {
    setSelected(generateRandomIndex());
  };
  const handleVote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };
  const maxIndex = points.indexOf(Math.max(...points));

  return (
    <>
      <div>
        <h2>Anecdote of the day</h2>
        <div>{anecdotes[selected]}</div>
        <p>Has {points[selected]} votes</p>
        <button onClick={handleVote}>Vote</button>
        <button onClick={handleChangeText}>Next anecdote</button>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <div>{anecdotes[maxIndex]}</div>
        <p>Has {points[maxIndex]} votes</p>
      </div>
    </>
  );
};

export default App;
