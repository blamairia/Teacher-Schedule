import React, { useState } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate('/teacher-home');
    } catch (error) {
      setError(error.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
          </div>
          {error && (
            <div className="mb-4 p-2 bg-red-200 text-white rounded">{error}</div>
            )}
            <button
                     type="submit"
                     className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                   >
            Sign In
            </button>
            <div className="mt-4">
            Don't have an account?{' '}
            <Link to="/sign-up" className="text-blue-500 hover:text-blue-600">
            Sign up
            </Link>
            </div>
            </form>
            </div>
            </motion.div>
            );
            }
            
            export default SignIn;
