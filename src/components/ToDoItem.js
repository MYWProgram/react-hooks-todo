import React from 'react';
import './ToDoItem.css';

const ToDoItem = props => {
  const { item, deleteItem } = props;

  return (
    <div className='ToDoItem'>
      <p className='ToDoItemText'>
        {item.id}. {item.text}
      </p>
      <button className='ToDoItemDelete' onClick={() => deleteItem(item.id)}>
        -
      </button>
    </div>
  );
};

export default ToDoItem;
