import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { useNavigate, Link } from 'react-router-dom';
import userService from '../../services/userService';
import './users.css';

const users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userService.list();
      setUsers(response);
      setIsLoading(false);
    } catch (error) {
      setError('An error occurred while fetching users.');
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    userService.logout();
    navigate('/signin');
  };

  const handleDeleteUser = async (userId) => {
    try {
      await userService.delete(userId);
      fetchUsers();
    } catch (error) {
      setError('An error occurred while deleting the user.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h1>Lista de Usuários</h1>
        <div className="header-buttons">
          <Link to="/users/new" className="btn btn-add">
            Adicionar Usuário
          </Link>
          <button onClick={handleLogout} className="btn btn-logout">
            Sair
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="user-list-table-container">
        <table className="user-list-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="action-buttons">
                    <Link to={`/users/edit/${user.id}`} className="btn-edit">
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn-delete"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">
                  Nenhum usuário encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default users;
