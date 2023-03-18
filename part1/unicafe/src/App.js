import { useState } from 'react'


const Feedback = (props) => {
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={props.handlerEvent[0]}>{props.text[0]}</button>
      <button onClick={props.handlerEvent[1]}>{props.text[1]}</button>
      <button onClick={props.handlerEvent[2]}>{props.text[2]}</button>
    </div>
  )
}

const Statistics = ({text, options}) => {
  const [good, neutral, bad] = options
  const all = good + neutral + bad
  const averageScore = good/all - bad/all
  const positivePercentage = good*100/all
  if(all >  0){
    return (
    
      <div>
        <h1>statistics</h1>
        <p>{text[0]} {good}</p>
        <p>{text[1]} {neutral}</p>
        <p>{text[2]} {bad}</p>
        <p>{text[3]} {all}</p>
        <p>{text[4]} {averageScore}</p>
        <p>{text[5]} {positivePercentage}</p>
      </div>
    )
  }
  return(
    <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const fieldText = ["good", "neutral", "bad", "all", "avarage", "positive"]
  const handleAddFeedback = [
    () => setGood(good + 1),
    () => setNeutral(neutral + 1),
    () => setBad(bad + 1),
  ]
  return (
    <div>
      <Feedback text={fieldText} handlerEvent={handleAddFeedback}></Feedback>
      <Statistics text={fieldText} options={[good, neutral, bad]}></Statistics>
    </div>
  )
}

export default App;
