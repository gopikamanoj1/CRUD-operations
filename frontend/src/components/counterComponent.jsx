import React from 'react'
import { useState } from 'react'

function CounterComponent() {

    const [state, setState] = useState(0)


    const decrement = () => {
    
        setState(state - 1)
    }

    const increment = () => {
        // state = ;
        setState(state + 1)
    }

    return (

        <div>
            <h1>{state}</h1>

            <button onClick={decrement}>
                decrement
            </button>


            <button onClick={increment}>
                increment
            </button>

        </div>
    )
}

export default CounterComponent
