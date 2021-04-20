
// import { inject, observer } from 'mobx-react';
import Counter from './components/Counter';
import CounterStore from './stores/CounterStore';

const counterStore = new CounterStore();

function App () {
  return <div><Counter counterStore={counterStore}/></div>
};

export default App;
