import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Productos from './pages/Productos';
import Proveedores from './pages/Proveedores';
import Registro from './pages/Registro';

function App() {
  const [sesionIniciada, setSesionIniciada] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      <BrowserRouter>
        {sesionIniciada && (
          <nav className="max-w-5xl mx-auto pt-6 px-4">
            <div className="bg-violet-900 px-6 py-4 rounded-3xl text-white shadow-xl shadow-violet-900/20 flex justify-between items-center">
              <div className="flex gap-8 items-center">
                <span className="font-extrabold text-xl tracking-tight">Inventario de la bodega</span>
                <div className="flex gap-6 font-medium text-violet-100">
                  <Link to="/productos" className="hover:text-white transition-colors">Productos</Link>
                  <Link to="/proveedores" className="hover:text-white transition-colors">Proveedores</Link>
                </div>
              </div>
              <button 
                onClick={() => setSesionIniciada(false)}
                className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-2xl font-bold backdrop-blur-sm transition-all"
              >
                Salir
              </button>
            </div>
          </nav>
        )}

        <main className="max-w-6xl mx-auto mt-8 px-4">
          <Routes>
            {!sesionIniciada ? (
              <>
                <Route path="/" element={<Login onLogin={() => setSesionIniciada(true)} />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/productos" element={<Productos />} />
                <Route path="/proveedores" element={<Proveedores />} />
                <Route path="*" element={<Navigate to="/productos" />} />
              </>
            )}
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;