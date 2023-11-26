import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import "../styles/TaskForm.css"

const TaskForm=({submitTask,submitEditTask,inputTask, setInputTask,flagFormEdit})=>{
  
   
    const handleChangeInput = (e) => {
        setInputTask(e.target.value)

    }

    
return(
    <>
    
    <form className="task-form" action="" onSubmit={flagFormEdit?submitEditTask:submitTask}>
    <input className={flagFormEdit?"task-input-edit":"task-input"} placeholder="Ingrese una Tarea" type="text" value={inputTask ||''}  onChange={handleChangeInput} />
    <button className={flagFormEdit?"task-button-edit":"task-button"} type="submit">{flagFormEdit?"Modificar":"Agregar Tarea"}</button>
    </form>


    
  
    </>
)
}

export default TaskForm