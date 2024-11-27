import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

const AdminPage = () => {
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await api.get("/auth/users", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        console.log(response);

        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setError("Unexpected response format.");
        }
      } catch (error) {
        setError("Error fetching users.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [auth.token]);

  const handleUpdateRole = async (userId) => {
    try {
      await api.put(
        `/auth/users/${userId}`,
        { role: "moderator" },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      alert("User updated to moderator!");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: "moderator" } : user
        )
      );
    } catch (error) {
      console.error(error);
      alert("Error updating role");
    }
  };

  return (
    <div>
      <h2>Welcome Admin</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} - {user.role}
            {user.role === "user" && (
              <button onClick={() => handleUpdateRole(user._id)}>
                Update to Moderator
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
