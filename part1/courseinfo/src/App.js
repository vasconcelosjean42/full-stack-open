const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}
const Parts = (props) => {
  return(
    <p>{props.parts.name} {props.parts.number}</p>
  )
}
const Content = (props) => {
  return (
    <div>
      <Parts parts={props.parts.parts[0]} />
      <Parts parts={props.parts.parts[1]} />
      <Parts parts={props.parts.parts[2]} />
    </div>
  )
}
const Total = (props) => {
  return (
    <p> Number of exercises {props.parts.parts[0].number + props.parts.parts[1].number + props.parts.parts[2].number} </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [     
      {name:"Fundamentals of React", number:10},
      {name:"Using props to pass data", number:7},
      {name:"State of a component", number:14}
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  );
}

export default App;
