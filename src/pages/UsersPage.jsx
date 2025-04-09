import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/');
  }, []);


  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    try {
      const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(res.data.data);
      setTotalPages(res.data.total_pages);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      alert('User deleted');
      setUsers(users.filter(user => user.id !== id));
    } catch {
      alert('Error deleting user');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${editingUser.id}`, editingUser);
      alert('User updated');
      setEditingUser(null);
      fetchUsers(page);
    } catch {
      alert('Error updating user');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
      <h1 className="text-3xl font-bold text-center mb-6">Hello ReqRes users!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {users.map(user => (
          <div key={user.id} className="bg-white rounded-lg shadow p-4 text-center">
            <img src={user.avatar} alt={user.first_name} className="rounded-full w-24 h-24 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">{user.first_name} {user.last_name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => setEditingUser(user)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <input
              type="text"
              placeholder="First Name"
              value={editingUser.first_name}
              onChange={e => setEditingUser({ ...editingUser, first_name: e.target.value })}
              className="border p-2 w-full mb-3 rounded"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={editingUser.last_name}
              onChange={e => setEditingUser({ ...editingUser, last_name: e.target.value })}
              className="border p-2 w-full mb-3 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={editingUser.email}
              onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
              className="border p-2 w-full mb-3 rounded"
            />
            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
