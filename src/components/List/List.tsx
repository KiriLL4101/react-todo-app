import React from 'react'
import classNames from 'classnames'
import Badge from '../Badge'

import './List.scss'

interface Item {
    icon?: string,
    label: string,
    color?: string,
    active?: boolean,
    className?: string
}

interface ItemList {
    items: Item[],
    onClick?: () => void,
    isRemoveble?: boolean
}

const List: React.FC<ItemList> = ({ items, onClick, isRemoveble }) => {
    return (
        <ul onClick={onClick} className="list">
            {
                items.map((item: Item, idx: number) => (
                    <li key={idx} className={classNames(item.className, { 'active': item.active })}>
                        {
                            item.icon && <i>
                                <img src={item.icon} alt="list icon" />
                            </i>
                        }
                        {
                            item.color && <Badge color={item.color}/>
                        }
                        <span>
                            {item.label}
                        </span>
                    </li>
                ))
            }
        </ul>
    )
}

export default List
