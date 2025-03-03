import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import SignIn from './pages/signIn';
import UserList from './pages/users';
import UserForm from './pages/userEdit';
import ProtectRoute from './utils/protectRouter';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />

        <Route
          path="/users"
          element={
            <ProtectRoute>
              <UserList />
            </ProtectRoute>
          }
        />

        <Route
          path="/users/new"
          element={
            <ProtectRoute>
              <UserForm />
            </ProtectRoute>
          }
        />

        <Route
          path="/users/edit/:id"
          element={
            <ProtectRoute>
              <UserForm />
            </ProtectRoute>
          }
        />

        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
