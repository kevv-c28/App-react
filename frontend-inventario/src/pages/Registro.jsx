import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


export default function Registro() {
    const [exito, setExito] = useState('');
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setError('');
    setExito('');
    try {
      const url = 'https://api-nikolokos.onrender.com/api/usuarios'; 
      const respuesta = await axios.post(url, { nombre, correo, password });
      
      if (respuesta.status === 200) {
        setExito('¡Cuenta creada, nikoloko! Redirigiendo...');
        setTimeout(() => {
        navigate('/');
      }, 3000); 
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrarse.');
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-white p-10 rounded-[2rem] shadow-2xl shadow-violet-900/10 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight text-center mb-6">Crea tu cuenta</h2>
        
        {exito && (
            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl mb-6 text-sm font-bold border border-emerald-100 animate-bounce">
                {exito}
            </div>
)}

        {error && <div className="bg-rose-50 text-rose-600 p-4 rounded-2xl mb-6 text-sm font-medium">{error}</div>}

        <form onSubmit={manejarRegistro} className="space-y-5">
          <input 
            type="text" placeholder="Nombre completo" required value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-violet-900/10 outline-none" 
          />
          <input 
            type="email" placeholder="Correo electrónico" required value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-violet-900/10 outline-none" 
          />
          <input 
            type="password" placeholder="Contraseña" required value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-violet-900/10 outline-none" 
          />
          
          <button type="submit" className="w-full bg-violet-900 text-white font-bold py-4 rounded-2xl shadow-lg hover:-translate-y-1 transition-all">
            Registrarme en Nikolokos
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          ¿Ya tienes cuenta? <Link to="/" className="text-violet-700 font-bold">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
}