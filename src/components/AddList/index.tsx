import React from 'react'
import List from '../List/List'

import addSvg from '../../assets/img/add.svg'
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
    const [visiblePopup, setVisiblePopup] = React.useState(true)

    return (
        <div className="add-list">
            <List
                onClick={() => setVisiblePopup(!visiblePopup)}
                items={[
                    {
                        label: 'Добавить список',
                        icon: addSvg,
                        className: 'list__add-btn'
                    }
                ]} />
            {
                visiblePopup && <div className="add-list__popup">
                    <input type="text" placeholder="Название списка" className="field" />
                    <div className="add-list__popup-colors">

                        {
                            colors.map(color => (
                                <Badge key={color.id} onClick={() => console.log(1)} color={color.name} />
                            ))
                        }

                    </div>
                    <button className="btn">Добавить</button>
                </div>
            }

        </div>
    )
}


export default AddList