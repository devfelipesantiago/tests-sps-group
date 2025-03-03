import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userService from '../../services/UserService';
import './userEdit.css';

const editUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    type: '',
    password: '',
  });
  const [errors, setErrors] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const userData = await userService.getUserById(id);

      setFormData({
        name: userData.name,
        email: userData.email,
        type: userData.type,
        password: '',
      });

      setLoading(false);
    } catch (err) {
      setErrors('An error occurred while fetching user data.');
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors('');

    try {
      const dataToSubmit = { ...formData };
      if (isEditMode && !dataToSubmit.password) {
        delete dataToSubmit.password;
      }

      if (isEditMode) {
        await userService.update(id, dataToSubmit);
      } else {
        await userService.create(dataToSubmit);
      }

      navigate('/users');
    } catch (err) {
      setErrors(
        err.response?.data?.message ||
          `Erro ao ${isEditMode ? 'atualizar' : 'criar'} usuário`
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="user-form-container">
      <div className="user-form-card">
        <h2 className="user-form-title">
          {isEditMode ? 'Editar Usuário' : 'Novo Usuário'}
        </h2>

        {error && (
          <div className="user-form-error">
            <span>{errors}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Tipo</label>
            <input
              id="type"
              name="type"
              type="text"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-buttons">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/users')}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-save" disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default editUser;
