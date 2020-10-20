import React from 'react'
import axios from 'axios';
import List from '../List'
import { IList, IColors } from '../../App'

import addSvg from '../../assets/img/add.svg'
import closeSvg from '../../assets/img/close.svg'
import './AddButtonList.scss'
import Badge from '../Badge'


type AddListProps = {
    colors: IColors[],
    onAdd: (list: IList) => void
}

const AddList: React.FC<AddListProps> = ({ colors, onAdd }) => {
    const [visiblePopup, setVisiblePopup] = React.useState<boolean>(false)
    const [selectdColor, setSelectdColor] = React.useState<number>(3)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [inputValue, setInputValue] = React.useState<string>('')

    React.useEffect(() => {
        if (colors.length > 1) {
            setSelectdColor(colors[0].id)
        }
    }, [colors])

    const onClose = () => {
        setInputValue('')
        setVisiblePopup(false)
        setSelectdColor(colors[0].id)
    }

    const addList = () => {
        if (!inputValue || !selectdColor) {
            alert('Введите название списка')
            return;
        }
        setIsLoading(true)
        axios.post('/lists', {
            name: inputValue,
            colorId: selectdColor
        }).then(({ data }) => {
            const color = colors.filter(v => v.id === selectdColor)[0].name
            onAdd({
                ...data,
                color: { name: color }
            })
            onClose()
        }).finally(() => setIsLoading(false))
    }

    return (
        <div className="add-list">
            <List
                onClick={() => setVisiblePopup(true)}
                items={[
                    {
                        name: 'Добавить список',
                        icon: addSvg,
                        className: 'list__add-btn'
                    }
                ]} />
            {
                visiblePopup && <div className="add-list__popup">
                    <img
                        src={closeSvg}
                        alt="close"
                        className="add-list__popup-close-btn"
                        onClick={onClose}
                    />

                    <input
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        placeholder="Название списка"
                        className="field" />

                    <div className="add-list__popup-colors">

                        {
                            colors.map(color => (
                                <Badge
                                    key={color.id}
                                    onClick={() => setSelectdColor(color.id)}
                                    color={color.name}
                                    className={selectdColor === color.id && 'active'}
                                />
                            ))
                        }

                    </div>
                    <button onClick={addList} className="btn">
                        {isLoading ? 'Добавление...' : 'Добавить'}
                    </button>
                </div>
            }

        </div>
    )
}


export default AddList