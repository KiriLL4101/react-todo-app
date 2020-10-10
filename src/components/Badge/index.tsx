import React from 'react'

import './Badge.scss'

const Badge: React.FC<{ color: string, onClick?: () => void }> = ({ color, onClick }) =>
    (<i onClick={onClick} className={`badge badge--${color}`}></i>)

export default Badge
