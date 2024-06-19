import React from 'react'
import {useState, useTransition, useDeferredValue} from 'react'

const Example1 = () => {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([])
  const [isPending, startTransition] =useTransition()
  const deferredCount = useDeferredValue(count)

  const handleClick = () => {
    // urgent
    setCount(count + 1)

    //transition update
    startTransition(() => {

      const myArr = Array(20000).fill(1).map((el, i) => (count + 20000) - i)
      setItems(myArr)
    })
  }


  return (
    <div>
      <button onClick={handleClick}>{count}</button>

      {isPending ? <p>Loading...</p> : null}
      <p>Deferred: {deferredCount}</p>

      <ul>
        {items.map(item => <li key={item}>{item}</li>)}

      </ul>
    </div>
  )
}

export default Example1