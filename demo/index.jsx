import React from 'react'
import * as ReactDOM from 'react-dom'
import './styles.css'
import Scroller from '../libs/scroller'

const App = () => {
  const height = 400
  const itemHeight = 60
  const data = [...Array(100).keys()]
  const itemCreater = index => (
    <p key={index} onClick={() => console.log(index)}>
      {index}
    </p>
  )
  return (
    <div className="wrap">
      <p>React Infinite Scroller Demo</p>
      <Scroller
        height={height}
        itemHeight={itemHeight}
        data={data}
        itemCreater={itemCreater}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
