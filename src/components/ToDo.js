import React, { useState } from 'react';
import ToDoItem from './ToDoItem';
import './ToDo.css';
import Logo from '../assets/logo.png';

const ToDo = () => {
  const [list, setList] = useState([
    { id: 1, text: 'Eat breakfast' },
    { id: 2, text: 'Clean the house' }
  ]);
  const [toDo, setToDo] = useState('');
  const [showError, setShowError] = useState(false);

  // ? 生成 todo id.
  const generateId = () => {
    if (list && list.length) return Math.max(...list.map(item => item.id)) + 1;
    return 1;
  };
  // ? 展示空错误提示。
  const displayError = () => {
    setShowError(true);
    const clearTimer = setTimeout(() => setShowError(false), 3000);
    return () => clearTimeout(clearTimer);
  };
  // ? 点击 "+" 生成新的 todoItem.
  const createNewToDoItem = () => {
    if (!toDo) {
      displayError();
      return;
    }
    const newId = generateId();
    const newToDo = { id: newId, text: toDo };
    setList([...list, newToDo]);
    setToDo('');
  };
  // ? 点击 "+" 添加 todoItem.
  const handleInput = e => {
    setToDo(e.target.value);
  };
  // ? 回车添加 todoItem.
  const handleEnterKeyPress = e => {
    if (e.key === 'Enter') {
      createNewToDoItem();
    }
  };
  // ? 传递给子组件的删除方法。
  const deleteItem = id => {
    setList(list.filter(item => item.id !== id));
  };

  return (
    <div className='ToDo'>
      <img className='Logo' src={Logo} alt='React logo' />
      <h1 className='ToDoHeader'>React Todo with Hooks</h1>
      <div className='ToDoWrapper'>
        <div>
          {list.map(item => {
            return <ToDoItem key={item.id} item={item} deleteItem={deleteItem} />;
          })}
        </div>
        <div className='ToDoInput'>
          <input
            type='text'
            placeholder='I need to do...'
            value={toDo}
            onChange={handleInput}
            onKeyPress={handleEnterKeyPress}
          />
          <button className='ToDoAdd' onClick={createNewToDoItem}>
            +
          </button>
        </div>
        <div className='ToDoErrorWrapper'>{showError && <p>Todo message is required!</p>}</div>
      </div>
    </div>
  );
};

export default ToDo;
