import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const manejarEntrada = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const respuesta = await axios.post('https://api-nikolokos.onrender.com', { correo, password });
      if (respuesta.status === 200) {
        onLogin(); navigate('/productos'); 
      }
    } catch (err) {
      setError('Correo o contraseña incorrecta. Intenta de nuevo.');
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-white p-10 rounded-[2rem] shadow-2xl shadow-violet-900/10 w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="bg-violet-100 text-violet-900 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">Bienvenido a Nikolokos</h2>
          <p className="text-gray-400 mt-2 text-sm">Ingresa tus datos para continuar</p>
        </div>
        
        {error && <div className="bg-rose-50 text-rose-600 p-4 rounded-2xl mb-6 text-sm font-medium text-center">{error}</div>}

        <form onSubmit={manejarEntrada} className="space-y-5">
          <div>
            <label className="block text-gray-600 font-medium mb-2 pl-1 text-sm">Correo electrónico</label>
            <input 
              type="email" required value={correo} onChange={(e) => setCorreo(e.target.value)}
              className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-violet-900/10 focus:bg-white transition-all outline-none" 
              placeholder="admin@empresa.com" 
            />
          </div>


          <div>
            <label className="block text-gray-600 font-medium mb-2 pl-1 text-sm">Contraseña</label>
            <input 
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-violet-900/10 focus:bg-white transition-all outline-none" 
              placeholder="••••••••" 
            />
          </div>
          
          <button type="submit" className="w-full bg-violet-900 text-white font-bold py-4 px-4 rounded-2xl shadow-lg shadow-violet-900/30 hover:-translate-y-1 hover:shadow-violet-900/40 transition-all duration-300 mt-4">
            Entrar al sistema de nikolokos.
          </button>
          
          <p className="text-center mt-6 text-sm text-gray-500">
            ¿No tienes cuenta? <Link to="/registro" className="text-violet-700 font-bold hover:underline">Regístrate aquí</Link>
          
          </p>


        </form>
      </div>
    </div>
  )
}