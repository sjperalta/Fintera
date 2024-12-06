import { useState, useEffect } from "react";
import UserData from "./UserData";
import { API_URL } from './../../../config'; // Asegúrate de tener configurada la URL base
import { getToken } from './../../../auth'; // Para obtener el token de autenticación

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = getToken(); // Obtén el token JWT de autenticación

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Incluye el token en los headers
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full overflow-x-scroll">
      <table className="w-full">
        <tbody>
          {users?.map((user, index) => (
            <UserData key={user.id} userInfo={user} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;