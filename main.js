const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)
function Counter({ item: { id, number }, hdlUpdate, hdlRemove }) {
    return (
        <div className="counter">
            <button onClick={() => hdlUpdate(id, -1)}>-</button>
            <h4>{number}</h4>
            <button onClick={() => hdlUpdate(id, 1)}>+</button>
            <button onClick={() => hdlUpdate(id, -number)}>C</button>
            <button onClick={() => hdlRemove(id)}>X</button>
        </div>
    )
}

function SumInfo(props) {
    const sum = props.counters.reduce((sum, counters) => sum + counters.number, 0)
    const stTitle = {
        color: props.color,
        fontSize: props.size === 'big' ? '50px' : '40px'
    }

    return (
        <div className='suminfo'>
            <h1 style={{ color: props.color, fontSize: '50px' }}>Sum = {sum}</h1>
        </div>
    )
}

function App() {

    const [counters, setCounters] = React.useState([{ id: 1, number: 0 }])

    const hdlUpdate = (id, num) => {
        const cloneCounters = [...counters]
        let idx = cloneCounters.findIndex(el => el.id === id)
        if (cloneCounters[idx].number + num < 0) {
            return
        }
        cloneCounters[idx].number += num
        setCounters(cloneCounters)
    }
    const hdlRemove = (id) => {
        const updatedCounters = counters.filter((el) => el.id !== id);
        setCounters(updatedCounters)
    }


    const hdlAddCounter = () => {
        let newId = counters.length === 0 ? 1 : counters.at(-1).id + 1
        // setCounter([...counters, {id: newId, number : 0}])
        const cloneCounters = [...counters]
        cloneCounters.push({ id: newId, number: 0 })
        setCounters(cloneCounters)
    }

    return (
        <>
            
            <h1>Codecamp Academy 01</h1>
            <button onClick={hdlAddCounter}>Add Counter</button>
            <SumInfo size="big" counters={counters} />

            {counters.map(el => {
                return <Counter key={el.id} item={el} hdlUpdate={hdlUpdate} hdlRemove={hdlRemove} />
            })}

        </>
    )
}