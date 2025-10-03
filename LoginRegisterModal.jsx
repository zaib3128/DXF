import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Button from './Button';

const LoginRegisterModal = ({ open, onClose }) => {
  const { login, register } = useContext(AuthContext);
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!open) return null;

  const submit = async () => {
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(name || 'User', email, password);
      }
      onClose();
    } catch (err) {
      alert(err?.response?.data?.message || 'Auth failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">{mode === 'login' ? 'Login' : 'Register'}</h3>

        {mode === 'register' && (
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full p-2 border rounded mb-2" />
        )}
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded mb-2" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border rounded mb-4" />

        <div className="flex justify-between">
          <div>
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-sm text-blue-600">
              {mode === 'login' ? 'Create account' : 'Have an account? Login'}
            </button>
          </div>
          <div className="space-x-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button primary onClick={submit}>{mode === 'login' ? 'Login' : 'Register'}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterModal;
