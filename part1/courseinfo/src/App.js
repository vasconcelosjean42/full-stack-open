const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}
const Part = (props) => {
  return(
    <p>{props.name} {props.number}</p>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part name={props.part[0].name} number={props.part[0].number} />
      <Part name={props.part[1].name} number={props.part[1].number} />
      <Part name={props.part[2].name} number={props.part[2].number} />
    </div>
  )
}
const Total = (props) => {
  return (
    <p> Number of exercises {props.totalNumber} </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part = [
    {name:"Fundamentals of React", number:10},
    {name:"Using props to pass data", number:7},
    {name:"State of a component", number:14}
  ]

  return (
    <div>
      <Header course={course} />
      <Content part={part} />
      <Total totalNumber={part[0].number + part[1].number + part[2].number} />
    </div>
  );
}

export default App;
