import "../styles/TaskItem.css"
import { RiDeleteBin2Fill } from "react-icons/ri"
import { FaCheckCircle } from "react-icons/fa"
import { ImRadioUnchecked } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
const TaskItem = ({task, completed,taskCompleted,taskDelete,taskUpdate}) => {
   
    return (
        <>



            <div className={completed?"task-container completed":"task-container"}>
                <div className="task-text" onClick={()=>taskCompleted(task.id)}>
                    {task.taskName}
                </div>
                <div className="task-container-icons" onClick={()=>taskCompleted(task.id)}>
                {completed?<FaCheckCircle className="task-icon"/>:<ImRadioUnchecked className="task-icon"/>}
                </div>
                <div className="task-container-icons" onClick={()=>taskUpdate(task)}>
                <FaEdit  className="task-icon"/>
                </div>
                <div className="task-container-icons" onClick={()=>taskDelete(task.id)}>
                <RiDeleteBin2Fill className="task-icon"/>
                </div>
            </div>
        </>
    )
}

export default TaskItem