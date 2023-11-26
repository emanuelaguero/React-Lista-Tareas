import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskList from './component/TaskList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='app-tasks'>
      <div className='main-task'>
        <h1>Mis Tareas</h1>
      <TaskList/>

      </div>
     
     </div>
    </>
  )
}

export default App
