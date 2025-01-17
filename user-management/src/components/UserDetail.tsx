import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserById, updateUserName } from '../store/userSlice';
import { RootState } from '../store/store';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const user = useSelector((state: RootState) => selectUserById(userId)(state));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(user ? user.name : '');

  if (!user) {
    return <div className="container"><p>Пользователь не найден</p></div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUserName({ id: userId, name }));
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Детали пользователя</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Имя:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Сохранить</button>
      </form>
      <Link to="/">Назад к списку</Link>
    </div>
  );
};

export default UserDetail;
