import React from 'react'
import classNames from 'classnames'
import Badge from '../Badge'

import './List.scss'
import removeSvg from '../../assets/img/remove.svg'

interface Item {
    id?: number,
    icon?: string,
    name: string,
    color?: string,
    active?: boolean,
    className?: string
}

interface ItemListProps {
    items: Item[],
    onClick?: () => void,
    isRemoveble?: boolean,
    onRemove?: (listsId: number) => void
}

const List: React.FC<ItemListProps> = ({ items, onClick, isRemoveble, onRemove }) => {
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
                            item.color && <Badge color={item.color} />
                        }
                        <span>
                            {item.name}
                        </span>
                        {
                            isRemoveble && <img src={removeSvg}
                                alt="remove btn"
                                className="list__remove-btn"
                            />
                        }
                    </li>
                ))
            }
        </ul>
    )
}

export default List
