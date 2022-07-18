import styles from './AddTask.module.css'
import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent } from 'react';

interface CreateTaks {
    createTask: (event: FormEvent) => void;
    taskChange: (event: ChangeEvent<HTMLInputElement>) => void;
    defaultValue: string;
}

export function AddTask({createTask, taskChange, defaultValue}: CreateTaks){

    function handleNewTaskInvalid(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('Defina um título para sua tarefa')

    }

    return(
        <form onSubmit={createTask} className={styles.inputTask}>
            <input
                type='text'
                name='taskInput'
                placeholder='Adicione uma nova tarefa'
                onChange={taskChange}
                value={defaultValue}
                onInvalid={handleNewTaskInvalid}
                required
            />

            <button type='submit' disabled={defaultValue.length == 0}>
            Criar <PlusCircle size={20}/>
            </button>
        </form>
    )
}