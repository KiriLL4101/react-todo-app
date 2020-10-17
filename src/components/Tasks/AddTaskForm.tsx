import React from 'react'

import addSvg from '../../assets/img/add.svg'

export const AddTaskForm: React.FC = () => {
    return (
        <div className="tasks__form">
            <div className="tasks__form-new">
                <img src={addSvg} alt="add" />
                <span>Новая задача</span>
            </div>
            <div className="tasks__form-block">
                <input
                    type="text"
                    placeholder="Название списка"
                    className="field" />

                <button className="btn">
                    Добавить задачу
                </button>
                <button className="btn btn--grey">
                    Отмена
                </button>
            </div>
        </div>
    )
}
