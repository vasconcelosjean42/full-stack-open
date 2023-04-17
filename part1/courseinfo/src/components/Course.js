const Course = ({ courses }) => 
  <>
    {courses.map((course, i) =>
      <div key={i}>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )}
  </>

const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)
  
  return <b>total of {total} exercices</b>
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map((part, i) => 
      <Part
        key={i}
        part={part}
      />
    )}
  </>
  
export default Course