import React, { useState, useEffect } from 'react';
import { auth, db, firebase } from './firebase';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TeacherHome from './components/TeacherHome';
import AdminPanel from './components/AdminPanel';
import TeacherScheduleEdit from './components/TeacherScheduleEdit';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/teacher-home"
            element={<TeacherHome />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route
            path="/admin/teacher-schedule-edit/:id"
            element={<TeacherScheduleEdit />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
