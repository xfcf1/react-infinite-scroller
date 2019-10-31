import * as React from 'react'
const { useState, useEffect } = React

interface IScroller {
  itemHeight: number
  height: number
  data: any[]
  itemCreater: (item: any) => React.Component
  rootId?: string
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
  const $rootId = rootId || 'scroller'
  let observer: IntersectionObserver
  const topHolderId = `${$rootId}_top_holder`
  const bottomHolderId = `${$rootId}_bottom_holder`
  const len = data.length
  const pageSize = Math.ceil(height / itemHeight) * 2
  const step = Math.ceil(pageSize / 2)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(pageSize)
  const [timer, setTimer] = useState<any>(0)

  useEffect(() => {
    installObserver()
    checkViewport()

    return () => {
      uninstallObserver()
    }
  }, [start, end])

  const installObserver = () => {
    const rootDom = document.getElementById($rootId)
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
          minusStep()
        }
      } else if (entry.target.id === bottomHolderId) {
        // bottom
        if (entry.isIntersecting) {
          addStep()
        }
      }
    }
  }
  const minusStep = (num: number = step) => {
    let newStart = start - num
    let newEnd = end - num
    if (start <= 0) {
      newStart = 0
      newEnd = pageSize
    }
    setStart(newStart)
    setEnd(newEnd)
  }
  const addStep = (num: number = step) => {
    let newStart = start + num
    let newEnd = end + num
    if (newEnd >= len) {
      newStart = start
      newEnd = len
    }
    setStart(newStart)
    setEnd(newEnd)
  }
  const checkViewport = () => {
    clearTimeout(timer)
    setTimer(
      setTimeout(() => {
        const topHolderDom = document.getElementById(topHolderId)
        const bottomHolderDom = document.getElementById(bottomHolderId)
        if (topHolderDom && bottomHolderDom) {
          let num: number = 0
          const topOffset = topHolderDom.getBoundingClientRect().bottom
          const bottomOffset = bottomHolderDom.getBoundingClientRect().top
          if (topOffset > 0) {
            num = Math.ceil(topOffset / itemHeight)
            minusStep(num)
          } else if (bottomOffset < 0) {
            num = Math.ceil(Math.abs(bottomOffset) / itemHeight)
            addStep(num)
          }
        }
      }, 200)
    )
  }

  const topHolderHeight = start * itemHeight
  const bottomHolderHeight = (len - end) * itemHeight

  const fragments = data.slice(start, end)
  const list = fragments.map((item: any) => itemCreater(item))

  return (
    <div
      style={{ height, overflow: 'auto', ...styles }}
      className={className}
      id={$rootId}
    >
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
