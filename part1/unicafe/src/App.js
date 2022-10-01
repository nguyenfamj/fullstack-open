import { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onGoodClick = () => {
    setGood(good + 1);
  };
  const onNeutralClick = () => {
    setNeutral(neutral + 1);
  };
  const onBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <div>
        <h2>Give feedback</h2>
        <Button text='Good' onClick={onGoodClick} />
        <Button text='Neutral' onClick={onNeutralClick} />
        <Button text='Bad' onClick={onBadClick} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (good || neutral || bad) {
    return (
      <div>
        <h2>Statistics</h2>
        <StatisticLine text='Good' value={good} />
        <StatisticLine text='Neutral' value={neutral} />
        <StatisticLine text='Bad' value={bad} />
        <StatisticLine text='All' value={all} />
        <StatisticLine text='Average' value={all / 3} />
        <StatisticLine text='Positive' value={`${(good / all) * 100}%`} />
      </div>
    );
  }
  return (
    <div>
      <h2>Statistics</h2>
      <p>No feedback given</p>
    </div>
  );
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

export default App;
