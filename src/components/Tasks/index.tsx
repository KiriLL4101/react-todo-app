import React from 'react'
import axios from 'axios'
import { AddTaskForm } from './AddTaskForm'
import { Task } from './Task'

import './Tasks.scss'
import editSvg from '../../assets/img/edit.svg'
import { IList } from '../../App'


interface TaskProps {
    list: IList,
    onEditTitle: (id: number, title: string) => void,
    onAddTask: (listId: number, task: any) => void,
    onCompleteTask: (listId: number, taskId: number, completed: boolean) => void,
    onRemoveTask: (listId: number, taskId: number) => void,
    onEditTask: (listId: number, task: { id: number, text: string }) => void,
    withoutEmpty?: boolean
}

const Tasks: React.FC<TaskProps> = ({ list, onEditTitle, onAddTask, withoutEmpty, onCompleteTask, onRemoveTask, onEditTask }) => {

    const editTitle = () => {
        const newTitle = window.prompt("Введите название списка", list.name)
        if (newTitle) {
            onEditTitle(list.id, newTitle);
            axios.patch('/lists/' + list.id, {
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
                        <Task
                            key={task.id}
                            list={list}
                            {...task}
                            onRemoveTask={onRemoveTask}
                            onCompleteTask={onCompleteTask}
                            onEditTask={onEditTask} />
                    ))
                }
                <AddTaskForm list={list} onAddTask={onAddTask} />
            </div>
        </div>
    )
}

export default Tasks
