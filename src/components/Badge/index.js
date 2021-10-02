import React from 'react'
import './badge.scss'

 const Badge = ({color, onClick, className, }) => <i onClick={onClick} className={`badge badge--${color} ${className}`}></i>

export default Badge;
