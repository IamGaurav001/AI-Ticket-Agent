import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/navbar";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ role: "", skills: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data);
        setFilteredUsers(data);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error("Error fetching users", err);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEditClick = (user) => {
    setEditingUser(user.email);
    setFormData({
      role: user.role,
      skills: user.skills?.join(", "),
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/update-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: editingUser,
            role: formData.role,
            skills: formData.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean),
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        console.error(data.error || "Failed to update user");
        return;
      }

      setEditingUser(null);
      setFormData({ role: "", skills: "" });
      fetchUsers();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredUsers(
      users.filter((user) => user.email.toLowerCase().includes(query))
    );
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-base-content">User Management</h1>
            <p className="text-base-content/70 mt-1">Manage user roles and skills</p>
          </div>
          <div className="form-control w-full md:w-auto">
            <input
              type="text"
              className="input input-bordered w-full md:w-80"
              placeholder="Search users by email..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="overflow-x-auto bg-base-100 shadow-xl rounded-box border border-base-200">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Skills</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover">
                  <td className="font-medium">{user.email}</td>
                  <td>
                    {editingUser === user.email ? (
                      <select
                        className="select select-bordered select-sm w-full max-w-xs"
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <div className={`badge ${user.role === 'admin' ? 'badge-error' : user.role === 'moderator' ? 'badge-warning' : 'badge-ghost'} badge-sm`}>
                        {user.role}
                      </div>
                    )}
                  </td>
                  <td>
                    {editingUser === user.email ? (
                      <input
                        type="text"
                        placeholder="Comma-separated skills"
                        className="input input-bordered input-sm w-full"
                        value={formData.skills}
                        onChange={(e) =>
                          setFormData({ ...formData, skills: e.target.value })
                        }
                      />
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {user.skills && user.skills.length > 0 ? (
                          user.skills.map((skill, idx) => (
                            <span key={idx} className="badge badge-outline badge-xs">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-base-content/30 text-xs italic">No skills</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="text-right">
                    {editingUser === user.email ? (
                      <div className="flex justify-end gap-2">
                        <button
                          className="btn btn-success btn-xs"
                          onClick={handleUpdate}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => setEditingUser(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => handleEditClick(user)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-base-content/50">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}