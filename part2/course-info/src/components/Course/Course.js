const Header = ({ title }) => <h1>{title}</h1>;

const Total = ({ amountArray }) => (
  <p style={{ fontWeight: 'bold' }}>
    Total number of exercises {amountArray.reduce((a, b) => a + b)}
  </p>
);

const Part = ({ part }) => {
  return (
    <p>
      {part?.name} {part?.exercises}
    </p>
  );
};

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

export const Course = ({ course }) => {
  const parts = course.parts;
  const exerciseAmountArray = parts.map((part) => part.exercises);
  return (
    <>
      <Header title={course.name} />
      <Content parts={parts} />
      <Total amountArray={exerciseAmountArray} />
    </>
  );
};
