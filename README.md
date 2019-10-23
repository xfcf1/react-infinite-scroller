# react-infinite-scroller

### install

`npm install`

### useage

```js
import Scroller from '../libs/scroller'

const App = () => {
  const height = 400
  const itemHeight = 60
  const data = Array.from({ length: 1000 }).map((_, index) => index + 1)
  const itemCreater = index => (
    <p key={index} onClick={() => console.log(index)}>
      {index}
    </p>
  )
  return (
    <div className="wrap">
      <p>React Infinite Scroller Demo</p>
      <Scroller
        rootId={'scroller'}
        height={height}
        itemHeight={itemHeight}
        data={data}
        itemCreater={itemCreater}
      />
    </div>
  )
}
```
