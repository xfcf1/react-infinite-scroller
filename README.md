# react-infinite-scroller

![image](https://raw.githubusercontent.com/xfcf1/react-infinite-scroller/master/image.gif)

## Installation

`npm i ob-infinite-scroller`

OR

`yarn add ob-infinite-scroller`

you can run demo with `npm start`

## How to use

```js
import React from 'react'
import * as ReactDOM from 'react-dom'
import Scroller from 'ob-infinite-scroller'

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
```

## Props

| Name        | Type            | Default | Description              |
| ----------- | --------------- | ------- | ------------------------ |
| itemHeight  | number          | 0       | item's height            |
| height      | number          | 0       | wrapper's height         |
| data        | any[]           | []      | your data array          |
| itemCreater | React.Component | void    | generate items with data |
| rootId      | string          | -       | -                        |
| styles      | style object    | -       | -                        |
| className   | string          | -       | -                        |
