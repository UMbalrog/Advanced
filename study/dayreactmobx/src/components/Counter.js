import { observer } from 'mobx-react-lite'

function Counter({ counterStore }) {
  // console.log(counterStore);
  // useEffect(() => {
  //   // const person = counterStore.person
  //   // autorun(() => {
  //   //   console.log(person.name)
  //   // })
  //   reaction(
  //     () => counterStore.count,
  //     (current, previous) => {
  //       console.log(current)
  //       console.log(previous)
  //     }
  //   )
  // }, [])
  return (
    <div>
      <p className="paragraph">{counterStore.count}</p>
      <button onClick={counterStore.increment} className="button">
        加 1
      </button>
      <button onClick={() => counterStore.reset()} className="button">
        重置
      </button>
    </div>
  )
}

export default observer(Counter)
