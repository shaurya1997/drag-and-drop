import React from 'react';
import './App.css';

const Task = ({ task, index, onDragStart, onDragOver }) => {
  return (
    <li
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragOver={(e) => onDragOver(e,index)}
      className="task"
    >
      {task}
    </li>
  );
};

export default Task;
