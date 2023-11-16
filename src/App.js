import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  deleteTask,
  completeTask,
  editTask,
  setPriority,
} from './action';
import styles from './styles.module.css';

const Task = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.task}>
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.name}
      </span>
      <button onClick={() => dispatch(completeTask(task.id))}>
        {task.completed ? 'Uncomplete' : 'Complete'}
      </button>
      <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
      <button onClick={() => dispatch(editTask(task.id, prompt('Enter new task name:')))}>
        Edit
      </button>
      <select
        className={styles.prioritySelect}
        value={task.priority}
        onChange={(e) => dispatch(setPriority(task.id, e.target.value))}
      >
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};

const App = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      dispatch(addTask(newTask));
      setNewTask(''); // Clear the input field
    }
  };

  return (
    <div className={styles.container}>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          placeholder='Type your task...'
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className={styles.addTask} onClick={handleAddTask}>Add Task</button>
      </div>
      <div>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
      <div>
        <p>Total tasks: {tasks.length}</p>
        <p>Active tasks: {tasks.filter((task) => !task.completed).length}</p>
      </div>
    </div>
  );
};

export default App;
