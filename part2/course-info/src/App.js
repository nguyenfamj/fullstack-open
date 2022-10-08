const Header = ({ course }) => <h1>{course.name}</h1>;

const Total = ({ amountArray }) => (
  <p style={{ fontWeight: 'bold' }}>
    Total number of exercises {amountArray.reduce((a, b) => a + b)}
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    <Part part={parts[0]} />
    <Part part={parts[1]} />
    <Part part={parts[2]} />
  </>
);

const Course = ({ course }) => {
  const parts = course.parts;
  const exerciseAmountArray = parts.map((part) => part.exercises);
  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total amountArray={exerciseAmountArray} />
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4,
      },
    ],
  };

  return (
    <>
      <Course course={course} />
    </>
  );
};

export default App;
