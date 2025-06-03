import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });

  const getUsers = () => {
    axios.get('http://localhost:5000/users').then(res => setUsers(res.data));
  };

  useEffect(getUsers, []);

  const addUser = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/users', form).then(() => {
      setForm({ name: '', email: '' });
      getUsers();
    });
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`).then(getUsers);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>MERN CRUD (Simple)</h2>
      <form onSubmit={addUser}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <button>Add</button>
      </form>
      <ul>
        {users.map(u => (
          <li key={u._id}>
            {u.name} - {u.email}
            <button onClick={() => deleteUser(u._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
