import React from "react";
import classNames from 'classnames'
import Badge from '../Badge'
import removeSvg from '../../assets/img/remove.svg'
import axios from 'axios'
import './List.scss'

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {

  const RemoveList = (item) => {
    if(window.confirm('Вы действительно хотите удалить этот список ?')){
      axios.delete('http://localhost:3001/lists/' + item.id);
      onRemove(item.id)
    }
  };

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li key={index} 
        onClick={ onClickItem ? () => onClickItem(item) : null}
        className={classNames(item.className , {
          active: item.active 
          ? item.active 
          : activeItem && activeItem.id === item.id})}>
          <i>
              {item.icon ? 
              (item.icon) : (
              <Badge color={item.color.name}/>
          )}</i>
          <span className={item.pluss ? 'list__add-str' : ''}>{item.name} {item.tasks && item.tasks.length > 0 && `(${item.tasks.length})`}</span>
          {isRemovable && 
          <img 
          src={removeSvg} 
          alt='close' 
          className='list__remove-icon' 
          onClick={() => RemoveList(item)}/>}
        </li>
      ))}
    </ul>
  );
};

export default List;
