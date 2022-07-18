import { Header } from './components/Header';
import styles from './App.module.css';
import { AddTask } from './components/AddTask';
import {v4 as uuidv4} from 'uuid';
import { Task } from './components/Task';
import { ChangeEvent, FormEvent, useState } from 'react'
import Clipboard from './assets/Clipboard.svg';

interface TaskProps {
  id: string;
  isComplete: boolean;
  title: string;
}

function App() {

  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  const [totalTasks, setTotalTasks] = useState(0);

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    const newTask: TaskProps = {
      id: uuidv4(),
      isComplete: false,
      title: newTaskTitle,
    }

    setTasks([...tasks, newTask])
    setNewTaskTitle('')
    countTotalTasks(+1)
  }

  function countTotalTasks(count:number){
    setTotalTasks((state) => {
      return state + count;
    })
  }

  function handleNewTasktChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(event.target.value)
    event.target.setCustomValidity('')
  }

  function deleteTask(idTask:string) {

    // O .filter() irá retornar uma nova lista.
    // Se o item retornar true (ou seja, se o id dele for diferente)
    // do idTask que está sendo passado, ele será inserido na nova
    // lista. Se for false, será removido.

    const tasksWithoutDeletedOne = tasks.filter(eachTask => {
      return eachTask.id != idTask;
    })

    setTasks(tasksWithoutDeletedOne)    
    countTotalTasks(-1)
  }

  function toggleCheckTask(idTask:string) {

    const tasksWithoutDeletedOne = tasks.filter(eachTask => {
      if(eachTask.id == idTask){
        eachTask.isComplete = !eachTask.isComplete;
      }
      return true;
    })

    setTasks(tasksWithoutDeletedOne)
  }


  const countCompletedTasks = tasks.reduce((countCompletedTasks, eachTask) => {
    if (eachTask.isComplete === true) {
      countCompletedTasks++
    }
    return countCompletedTasks;
  }, 0);
  

  return (
    <section>
      <Header />

      <AddTask createTask={handleCreateTask} taskChange={handleNewTasktChange} defaultValue={newTaskTitle} />

      <div className={styles.taskList}>

        <header>
          <div className={styles.left}>
            <strong>Tarefas criadas</strong>
            <span>{totalTasks}</span>
          </div>
          <div className={styles.right}>
            <strong>Concluídas</strong>
            <span>{countCompletedTasks} de {totalTasks}</span>
          </div>
        </header>

        {
          tasks.length > 0 ? (
            <ul>
              {tasks.map(task => {
                return(
                    <Task
                    key={task.id}
                    id={task.id}
                    isComplete={task.isComplete}
                    title={task.title}
                    deleteTask={deleteTask}
                    toggleCheckTask={toggleCheckTask}
                    />
                )
              })}
            </ul>
          ): (
            <div className={styles.noTask}>
              <img src={Clipboard} alt="" />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
          )
        }

      </div>

    </section>
  )
}

export default App
