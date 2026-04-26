import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Создать React-приложение', done: true },
    { id: 2, text: 'Написать Dockerfile', done: true },
    { id: 3, text: 'Собрать Docker-образ', done: false },
    { id: 4, text: 'Загрузить проект на GitHub', done: false },
  ]);
  const [input, setInput] = useState('');

  const addTask = () => {
    const text = input.trim();
    if (!text) return;
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') addTask();
  };

  const done  = tasks.filter(t => t.done).length;
  const total = tasks.length;

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">
          <span className="icon">✓</span> ToDo App
        </h1>
        <p className="subtitle">Запущено в Docker-контейнере</p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: total ? `${(done / total) * 100}%` : '0%' }}
          />
        </div>
        <p className="progress-label">{done} из {total} задач выполнено</p>

        <div className="input-row">
          <input
            className="task-input"
            type="text"
            placeholder="Новая задача..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="btn-add" onClick={addTask}>Добавить</button>
        </div>

        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
              <span className="checkbox" onClick={() => toggleTask(task.id)}>
                {task.done ? '✓' : '○'}
              </span>
              <span className="task-text">{task.text}</span>
              <button className="btn-del" onClick={() => deleteTask(task.id)}>✕</button>
            </li>
          ))}
        </ul>

        {total === 0 && (
          <p className="empty">Список задач пуст. Добавьте первую задачу!</p>
        )}
      </div>
    </div>
  );
}

export default App;
