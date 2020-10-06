import React from 'react'

import './list.scss'

interface Item {
    icon?: string,
    label: string,
    color?: string,
    active: boolean
}

interface ItemList {
    items: Item[]
}

const List: React.FC<ItemList> = ({ items }) => {
    return (
        <ul className="list">
            {
                items.map((item: Item, i) => (
                    <li key={i} className={item.active ? 'active' : ''}>
                        {
                            item.icon && <i>
                                <img src={item.icon} alt="list icon" />
                            </i>
                        }
                        {
                            item.color && <i className={`badge badge--${item.color}`}></i>
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
