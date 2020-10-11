import React from 'react'
import List from '../List/List'

import addSvg from '../../assets/img/add.svg'
import closeSvg from '../../assets/img/close.svg'
import './AddButtonList.scss'
import Badge from '../Badge'

interface IColors {
    id: number;
    hex: string;
    name: string;
}

type AddListProps = {
    colors: IColors[]
}

const AddList: React.FC<AddListProps> = ({ colors }) => {
    const [visiblePopup, setVisiblePopup] = React.useState<boolean>(false)
    const [selectdColor, setSelectdColor] = React.useState<number>(colors[0].id)

    return (
        <div className="add-list">
            <List
                onClick={() => setVisiblePopup(true)}
                items={[
                    {
                        label: 'Добавить список',
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
                        onClick={() => setVisiblePopup(false)}
                    />
                    <input type="text" placeholder="Название списка" className="field" />
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
                    <button onClick={() => setVisiblePopup(false)} className="btn">Добавить</button>
                </div>
            }

        </div>
    )
}


export default AddList