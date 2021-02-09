import { useState } from 'react'
import Settings from './components/Settings/Settings'
import Preview from './components/Preview/Preview'
import './App.css'

function App() {

  const [datas, setDatas] = useState({
    revenus: 2200,
    chargesFixes: 800,
    chargesCourantes: 400,
    dimension: 960
  })

  return (
    <div className="App">
      <Settings datas={datas} onUpdate={setDatas}/>
      <Preview {...datas}/>
    </div>
  );
}

export default App;
