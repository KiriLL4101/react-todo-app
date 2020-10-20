import React from 'react'
import classNames from 'classnames'
import axios from 'axios'
import Badge from '../Badge'

import './List.scss'
import removeSvg from '../../assets/img/remove.svg'

interface Item {
    id?: number,
    icon?: string,
    name: string,
    color?: {
        id: number,
        hex: string,
        name: string
    },
    active?: boolean,
    className?: string
}

interface ItemListProps {
    items: Item[],
    onClick?: () => void,
    isRemoveble?: boolean,
    onRemove?: (id: number) => void,
    onClickItem?: (item: any) => void,
    activeItem?: Item
}

const List: React.FC<ItemListProps> = ({
    items,
    onClick,
    isRemoveble,
    onRemove,
    onClickItem,
    activeItem
}) => {

    const removeList = (item: Item) => {
        if (window.confirm('Выдействительно хотите удалить ?')) {
            axios.delete('/lists/' + item.id).then(() => {
                if (onRemove) {
                    onRemove(item.id as number)
                }
            })

        }
    }

    return (
        <ul onClick={onClick} className="list">
            {
                items.map((item: Item, idx: number) => (
                    <li key={idx}
                        className={classNames(item.className, {
                            active: item.active ? item.active : activeItem && activeItem.id === item.id
                        })}
                        onClick={onClickItem ? (e) => onClickItem(item) : () => { }}>
                        {
                            item.icon && <i>
                                <img src={item.icon} alt="list icon" />
                            </i>
                        }
                        {
                            item.color && <Badge color={item.color.name} />
                        }
                        <span>
                            {item.name}
                        </span>
                        {
                            isRemoveble ? <img src={removeSvg}
                                alt="remove btn"
                                className="list__remove-btn"
                                onClick={() => removeList(item)}
                            /> : null
                        }
                    </li>
                ))
            }
        </ul>
    )
}

export default List
