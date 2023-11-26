import TaskForm from "./TaskForm"
import TaskItem from "./TaskItem"
import { v4 as uuidv4 } from "uuid"
import "../styles/TaskList.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react"

const TaskList = () => {

    const [tasks, setTasks] = useState(localStorage.getItem('tasksLocal') ? JSON.parse(localStorage.getItem('tasksLocal')) : [])
    const [task, setTask] = useState("")
    const [inputTask, setInputTask] = useState("")
    const [flagFormEdit, setFlagFormEdit] = useState(false)
    const [opType, setOpType] = useState("")
    
    

    const validateInputAlert = () => toast.error('Ingrese una Tarea', {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
    });
    const validateOpAlert = (value) => toast.success('Tarea ' + value + ' Correctamente', {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
    });
    const validateCompletedAlert = (value) => toast.info('Tarea ' + value, {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
    });

    useEffect(() => {
        if (opType === "add") {
            validateOpAlert('Agregada')
        } else if (opType === "update") {
            validateOpAlert('Modificada')
        } else if (opType === "delete") {
            validateOpAlert('Eliminada')
        } else {
            if (opType !== "") {
                if (opType) {
                    validateCompletedAlert('Completa')
                } else {
                    validateCompletedAlert('Incompleta')
                }
            }
        }

    }, [tasks])

   


    useEffect(() => {
        const data = JSON.stringify(tasks)
        localStorage.setItem('tasksLocal', data)
    }, [tasks])


    ///////////////////AGREGAR////////////////////////////

    const submitTask = (e) => {
        e.preventDefault()
        const newTask = {
            id: uuidv4(),
            taskName: inputTask,
            completed: false
        }
        addTask(newTask)
        setOpType("add")
    }

    const addTask = (task) => {

        if (task.taskName.trim()) {
            task.taskName = task.taskName.trim()
            const tasksUpdate = [task, ...tasks]
            setTasks(tasksUpdate)
            setInputTask('')

        } else {
            validateInputAlert()
        }
    }
    /////////////////// TAREA COMPLETADA////////////////////////////

    const taskCompleted = (id) => {
        const task2 = tasks.map((tarea) => {
            if (tarea.id === id) {
                tarea.completed = !tarea.completed
                setOpType(tarea.completed)
            }
            return tarea
        })
        setTasks(task2)


    }

    ///////////////////ELIMINAR TAREA/////////////////////////////////////

    const taskDelete = (id) => {

        const task2 = tasks.filter((task) => task.id !== id)
        setTasks(task2)
        setOpType("delete")
    }

    ///////////////////MODIFICAR////////////////////////////

    const submitEditTask = (e) => {
        e.preventDefault()
        if (inputTask === "") {
            validateInputAlert()
        } else {
            const tasks2 = tasks.map((item) => {
                if (item.id === task.id) {
                    item = { id: item.id, taskName: inputTask, completed: task.completed }
                    return item
                }
                return item

            })
            setFlagFormEdit(!flagFormEdit)
            setInputTask('')
            setTasks(tasks2)
            setOpType("update")
        }
    }


    const taskUpdate = (task) => {

        console.log(task)
        setFlagFormEdit(true)
        setTask(task)
        setInputTask(task.taskName)
    }


    return (
        <>

            <TaskForm submitTask={submitTask} submitEditTask={submitEditTask} setInputTask={setInputTask} inputTask={inputTask} task={task} flagFormEdit={flagFormEdit} />

            <h2>{tasks.length === 0 ? "Sin Tareas" : "Lista de Tareas"}</h2>
            <div hidden="" className="task-list-container">
                {tasks.map((item) => {
                    return (<TaskItem key={item.id} task={item} completed={item.completed} taskCompleted={taskCompleted} taskDelete={taskDelete} taskUpdate={taskUpdate} />)
                }
                )}

            </div>
            <ToastContainer />
        </>
    )
}

export default TaskList