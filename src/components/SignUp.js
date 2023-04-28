import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    specialty: '',
    error: null,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, specialty } = state;

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await db.collection('teachers').doc(user.uid).set({
        name,
        email,
        specialty,
      });

      await db
        .collection('teachers')
        .doc(user.uid)
        .collection('schedules')
        .doc('staticSchedule')
        .set({});

      navigate('/teacher-home');
    } catch (error) {
      setState({ ...state, error: error.message });
    }
  };

  const { name, email, password, specialty, error } = state;

  return (
    <div>
      <h1>Teacher Sign Up</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="specialty"
          placeholder="Specialty"
          value={specialty}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
