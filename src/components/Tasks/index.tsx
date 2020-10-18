import React from 'react'
import axios from 'axios'
import { AddTaskForm } from './AddTaskForm'

import './Tasks.scss'
import editSvg from '../../assets/img/edit.svg'
import { Task } from './Task'


export interface ITask {
    complited?: boolean,
    id?: number,
    text?: string,
    listId?: number
}

interface Tasks {
    color?: {
        hex: string,
        id: number
        name: string
    },
    colorId?: number
    id: number
    name?: string,
    tasks?: ITask[]
}

interface TaskProps {
    list: Tasks,
    onEditTitle: (id: number, title: string) => void,
    onAddTask: (listId: number, task: any) => void,
    withoutEmpty?: boolean
}

const Tasks: React.FC<TaskProps> = ({ list, onEditTitle, onAddTask, withoutEmpty }) => {

    const editTitle = () => {
        const newTitle = window.prompt("Введите название списка", list.name)
        if (newTitle) {
            onEditTitle(list.id, newTitle);
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                alert('Не удалось обновить название списка')
            })
        }
    }

    return (
        <div className="tasks">
            <h1 style={{ color: list.color?.hex }} className="tasks__title">
                {list.name}
                <img onClick={editTitle} src={editSvg} alt="edit" className="edit" />
            </h1>

            <div className="tasks__items">
                {!withoutEmpty && !list.tasks!.length && <h2>Задачи отсутствуют</h2>}
                {
                    list.tasks!.map(task => (
                        <Task key={task.id} {...task} />
                    ))
                }
                <AddTaskForm list={list} onAddTask={onAddTask} />
            </div>
        </div>
    )
}

export default Tasks
