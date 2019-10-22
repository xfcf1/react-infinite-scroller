import * as React from 'react'
const { useState, useEffect } = React

interface IScroller {
  rootId: string
  itemHeight: number
  height: number
  data: any[]
  itemCreater: (item: any) => React.Component
  styles?: { [key: string]: string | number }
  className?: string
}

const Scroller = (props: IScroller) => {
  const {
    itemHeight,
    height,
    data,
    styles,
    className,
    itemCreater,
    rootId
  } = props
  let observer: IntersectionObserver
  const topHolderId = `${rootId}_top_holder`
  const bottomHolderId = `${rootId}_bottom_holder`
  const len = data.length
  const step = Math.ceil(height / itemHeight)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(step * 2)

  useEffect(() => {
    installObserver()

    return () => {
      uninstallObserver()
    }
  }, [data.length, start, end])

  const installObserver = () => {
    const rootDom = document.getElementById(rootId)
    observer = new IntersectionObserver(obCallback, { root: rootDom })
    const topHolderDom = document.getElementById(topHolderId)
    const bottomHolderDom = document.getElementById(bottomHolderId)
    if (topHolderDom) {
      observer.observe(topHolderDom)
    }
    if (bottomHolderDom) {
      observer.observe(bottomHolderDom)
    }
  }
  const uninstallObserver = () => {
    if (observer) {
      const topHolderDom = document.getElementById(topHolderId)
      const bottomHolderDom = document.getElementById(bottomHolderId)
      if (topHolderDom) {
        observer.unobserve(topHolderDom)
      }
      if (bottomHolderDom) {
        observer.unobserve(bottomHolderDom)
      }
    }
  }

  const obCallback = (entries: IntersectionObserverEntry[]) => {
    if (entries.length === 1) {
      const entry = entries[0]
      if (entry.target.id === topHolderId) {
        // top
        if (entry.isIntersecting) {
          let newStart = start - step
          let newEnd = end - step
          if (start <= 0) {
            newStart = 0
            newEnd = step * 2
          }
          setStart(newStart)
          setEnd(newEnd)
        }
      } else if (entry.target.id === bottomHolderId) {
        // bottom
        if (entry.isIntersecting) {
          let newStart = start + step
          let newEnd = end + step
          if (end >= len) {
            newStart = start
            newEnd = len + 1
          }
          setStart(newStart)
          setEnd(newEnd)
        }
      }
    }
  }

  const topHolderHeight = start * step
  const bottomHolderHeight = (len - end) * step

  const fragments = data.slice(start, end)
  const list = fragments.map((item: any) => itemCreater(item))

  return (
    <div style={{ ...styles }} className={className} id={rootId}>
      <div style={{ height: topHolderHeight, minHeight: 1 }} id={topHolderId} />
      {list}
      <div
        style={{ height: bottomHolderHeight, minHeight: 1 }}
        id={bottomHolderId}
      />
    </div>
  )
}

export default Scroller
