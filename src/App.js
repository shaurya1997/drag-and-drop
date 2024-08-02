import React, { useState } from 'react';
import Column from './Column';
import './App.css';

const initialColumns = {
  todo: ['Task 1', 'Task 2'],
  inProgress: ['Task 3'],
  done: ['Task 4'],
};

const Board = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [draggedTask, setDraggedTask] = useState(null);
  const [sourceColumn, setSourceColumn] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const handleDragStart = (e, task, column) => {
    setDraggedTask(task);
    setSourceColumn(column);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
    setDragOverColumn(e.currentTarget.id); // Set the current column ID
  };

  const handleDrop = (e, column) => {
    e.preventDefault();
    if (draggedTask && sourceColumn !== column) {
      const sourceTasks = [...columns[sourceColumn]];
      const destTasks = [...columns[column]];

      // Remove task from source column
      const taskIndex = sourceTasks.indexOf(draggedTask);
      sourceTasks.splice(taskIndex, 1);

      // Insert task into destination column
      if (dragOverIndex === null) {
        destTasks.push(draggedTask);
      } else {
        destTasks.splice(dragOverIndex, 0, draggedTask);
      }

      setColumns(prevColumns => ({
        ...prevColumns,
        [sourceColumn]: sourceTasks,
        [column]: destTasks,
      }));
    }

    // Reset state
    setDraggedTask(null);
    setSourceColumn(null);
    setDragOverIndex(null);
    setDragOverColumn(null);
  };

  const handleAddTask = (column) => {
    const newTask = prompt('Enter task name:');
    if (newTask) {
      setColumns(prevColumns => ({
        ...prevColumns,
        [column]: [...prevColumns[column], newTask],
      }));
    }
  };

  return (
    <div className="board">
      {Object.keys(columns).map(column => (
        <Column
          key={column}
          id={column}
          name={column}
          tasks={columns[column]}
          onDrop={e => handleDrop(e, column)}
          onDragStart={(e,task) => handleDragStart(e, task, column)}
          onDragOver={(e,index) => handleDragOver(e, index)}
          onAddTask={() => handleAddTask(column)}
        />
      ))}
    </div>
  );
};

export default Board;
