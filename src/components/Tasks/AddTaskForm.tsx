import React from 'react'
import axios from 'axios'

import addSvg from '../../assets/img/add.svg'

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
interface PropsForm {
    list: Tasks,
    onAddTask: (listId: number, task: any) => void
}

export const AddTaskForm: React.FC<PropsForm> = ({ list, onAddTask }) => {
    const [visibleForm, setVisibleForm] = React.useState<boolean>(false)
    const [inputValue, setInputValue] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const toggleForm = () => {
        setVisibleForm(!visibleForm)
        setInputValue('')
    }

    const addTask = () => {
        if (inputValue) {
            const newTask = {
                listId: list.id,
                text: inputValue,
                complited: false
            }
            setIsLoading(true)
            axios.post('http://localhost:3001/tasks', newTask).then(({ data }) => {
                onAddTask(list.id, data)
                toggleForm()
            }).catch(() => alert("Ошибка при добавлении задачи"))
                .finally(() => setIsLoading(false))
        }
    }

    return (
        <div className="tasks__form">
            {
                visibleForm ? <div className="tasks__form-block">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Название задачи"
                        className="field" />
                    <button className="btn" onClick={addTask} disabled={isLoading}>
                        {!isLoading ? "Добавить задачу" : "Добавление..."}
                    </button>
                    <button className="btn btn--grey" onClick={toggleForm}>
                        Отмена
                    </button>
                </div> : <div className="tasks__form-new" onClick={toggleForm}>
                        <img src={addSvg} alt="add" />
                        <span>Новая задача</span>
                    </div>
            }
        </div>
    )
}
