import React from 'react'
import classNames from 'classnames'

import './Badge.scss'

const Badge: React.FC<{ color: string, onClick?: () => void, className?: string | boolean }> = ({ color, onClick, className }) =>
    (<i onClick={onClick} className={classNames('badge', { [`badge--${color}`]: color }, className)}></i >)

export default Badge
