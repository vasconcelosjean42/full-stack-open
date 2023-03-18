import { useState } from 'react'

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const Feedback = ({handlerEvent, texts}) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handlerEvent[0]} text={texts[0]}/>
      <Button onClick={handlerEvent[1]} text={texts[1]}/>
      <Button onClick={handlerEvent[2]} text={texts[2]}/>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text} {value}</td>
    </tr>
  )
}

const Statistics = ({texts, values}) => {
  const [good, neutral, bad] = values
  const all = good + neutral + bad
  const averageScore = good/all - bad/all
  const positivePercentage = good*100/all
  if(all >  0){
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
          <StatisticLine text={texts[0]} value={good}/>
          <StatisticLine text={texts[1]} value={neutral}/>
          <StatisticLine text={texts[2]} value={bad}/>
          <StatisticLine text={texts[3]} value={all}/>
          <StatisticLine text={texts[4]} value={averageScore}/>
          <StatisticLine text={texts[5]} value={positivePercentage + " %"}/>
        </tbody>
      </table>
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
      <Feedback texts={fieldText} handlerEvent={handleAddFeedback}/>
      <Statistics texts={fieldText} values={[good, neutral, bad]}/>
    </div>
  )
}

export default App;
