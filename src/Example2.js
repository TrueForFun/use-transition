import React from 'react'
import { useDeferredValue, useState, useTransition, useEffect } from 'react'


const bigArray =[...Array(20000).keys()]


const Example2 = () => {
  const [inputValuse, setInputValue] = useState('')
  const [list, setList] = useState(bigArray)
  const [isPending, startTransition] = useTransition()
  const deferredInput = useDeferredValue(inputValuse)

  const handleInput = (e) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    startTransition(() => {
      console.log(deferredInput)
      const filtered = bigArray.filter(item => item.toString().includes(deferredInput))
      setList(filtered)
    })
  }, [deferredInput])

  const content = <section style={isPending ? {opacity: 0.4} : null}>
    <p>Searching for: {deferredInput || 'All'}</p>
    {isPending ? <p>Loading...</p> : null}
    <ul>{list.map(item => <li key={item}>{item}</li>)}</ul>



  </section>

  return (
    <div>

    <input type='text' value={inputValuse} onChange={handleInput}></input>
    {content}


    </div>
  )
}

export default Example2