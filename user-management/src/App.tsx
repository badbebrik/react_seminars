import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UsersList from './components/UserList';
import UserDetail from './components/UserDetail';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );
};

export default App;
