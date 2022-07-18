import { Check, Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface dataTask {
  id: string;
  isComplete: boolean;
  title: string;
  deleteTask: (idTask: string) => void;
  toggleCheckTask: (idTask: string) => void;
}

export function Task({id,isComplete, title, deleteTask, toggleCheckTask}:dataTask){

    let task_CompletedClass: string;
    task_CompletedClass = isComplete ? styles.task_Completed : '';

    function handleToggleCheck(){
      toggleCheckTask(id)
    }

    function handleDeleteComment() {
      deleteTask(id)
    }

    return(
        <li className={`${styles.task} ${task_CompletedClass}`}>
          <button
           className={styles.taskComplete}
           onClick={handleToggleCheck}
           >
            <Check size={20}/>
          </button>
          <div className={styles.taskTitle}>
          {title}
          </div>
          <button
           onClick={handleDeleteComment}
           title='Deletar comentário'
           className={styles.taskDelete}>
            <Trash size={20} />
          </button>
        </li>
    )
}