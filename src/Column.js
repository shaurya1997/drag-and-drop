import React from 'react';
import Task from './Task';
import './App.css';

const Column = ({ id, name, tasks, onDrop, onDragStart, onAddTask, onDragOver }) => {
  return (
    <div
      id={id}
      className="column"
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <h2>{name}</h2>
      <ul>
        {tasks.map((task, index) => (
          <Task
            key={task}
            task={task}
            index={index}
            onDragStart={(e) => onDragStart(e, task)}
            onDragOver={(e) => onDragOver(e,index)}
          />
        ))}
      </ul>
      <button onClick={onAddTask}>Add Task</button>
    </div>
  );
};

export default Column;
