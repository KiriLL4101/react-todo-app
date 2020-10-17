import React from 'react'
import axios from 'axios'
import { AddTaskForm } from './AddTaskForm'

import './Tasks.scss'
import editSvg from '../../assets/img/edit.svg'


interface Task {
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
    tasks?: Task[]
}

interface TaskProps {
    list: Tasks,
    onEditTitle: (id: number, title: string) => void
}

const Tasks: React.FC<TaskProps> = ({ list, onEditTitle }) => {

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
            <h1 className="tasks__title">
                {list.name}
                <img onClick={editTitle} src={editSvg} alt="edit" className="edit" />
            </h1>

            <div className="tasks__items">
                {
                    (list.tasks && list.tasks.length > 0) ? list.tasks.map(item => (
                        <div key={item.id} className="tasks__items-row">
                            <div className="checkbox">
                                <input type="checkbox" id={`task-${item.id}`} />
                                <label htmlFor={`task-${item.id}`}>
                                    <svg
                                        width="11"
                                        height="8"
                                        viewBox="0 0 11 8"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                                            stroke="#fff"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </label>
                            </div>
                            <input readOnly value={item.text} />
                        </div>
                    )) : <h2>Задачи отсутствуют</h2>
                }
            </div>
            <AddTaskForm />
        </div>
    )
}

export default Tasks
