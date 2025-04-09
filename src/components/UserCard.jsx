import React, { useState } from 'react';

const UserCard = ({ user, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });

  const handleSave = () => {
    onUpdate(user.id, editData);
    setEditing(false);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow text-center">
      <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full mx-auto mb-4" />
      {editing ? (
        <>
          <input
            className="w-full border p-1 rounded mb-2"
            value={editData.first_name}
            onChange={e => setEditData({ ...editData, first_name: e.target.value })}
          />
          <input
            className="w-full border p-1 rounded mb-2"
            value={editData.last_name}
            onChange={e => setEditData({ ...editData, last_name: e.target.value })}
          />
          <input
            className="w-full border p-1 rounded mb-3"
            value={editData.email}
            onChange={e => setEditData({ ...editData, email: e.target.value })}
          />
          <button
            className="bg-green-500 text-white px-3 py-1 rounded mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-400 text-white px-3 py-1 rounded"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3 className="font-semibold text-lg mb-1">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-sm text-gray-600 mb-4">{user.email}</p>
          <div className="flex justify-center gap-2">
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => onDelete(user.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCard;
