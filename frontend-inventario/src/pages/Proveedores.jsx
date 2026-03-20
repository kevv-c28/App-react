import { useState, useEffect } from 'react';
import axios from 'axios';
import Tabla from '../components/Tabla';
import Modal from '../components/Modal';
import Alerta from '../components/Alerta';

export default function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [alerta, setAlerta] = useState({ mostrar: false, mensaje: '', tipo: '' });
  
  const estadoInicialFormulario = { empresa: '', contacto: '', telefono: '', email: '', activo: 'Activo' };
  const [formulario, setFormulario] = useState(estadoInicialFormulario);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    obtenerProveedores();
  }, []);

  const obtenerProveedores = async () => {
    try {
      const respuesta = await axios.get('https://api-nikolokos.onrender.com/api/proveedores');
      setProveedores(respuesta.data);
    } catch (error) {
    }
  };

  const guardarProveedor = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await axios.put(`https://api-nikolokos.onrender.com/api/proveedores/${editandoId}`, formulario);
        mostrarAlerta('Proveedor actualizado correctamente', 'exito');
      } else {
        await axios.post('https://api-nikolokos.onrender.com/api/proveedores', formulario);
        mostrarAlerta('Proveedor registrado correctamente', 'exito');
      }
      obtenerProveedores();
      cerrarModal();
    } catch (error) {
      mostrarAlerta('Error al guardar', 'error');
      cerrarModal();
    }
  };

  const eliminarProveedor = async (id) => {
    if (window.confirm('¿Estás seguro de dar de baja a este proveedor?, SEGURISIMO?')) {
      try {
        await axios.delete(`https://api-nikolokos.onrender.com/api/proveedores/${id}`);
        mostrarAlerta('Proveedor eliminado', 'exito');
        obtenerProveedores();
      } catch (error) {
      }
    }
  };

  const mostrarAlerta = (mensaje, tipo) => {
    setAlerta({ mostrar: true, mensaje, tipo });
    setTimeout(() => setAlerta({ mostrar: false, mensaje: '', tipo: '' }), 3000);
  };

  const abrirModalCrear = () => {
    setFormulario(estadoInicialFormulario);
    setEditandoId(null);
    setModalAbierto(true);
  };

  const abrirModalEditar = (proveedor) => {
    setFormulario(proveedor);
    setEditandoId(proveedor.id);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setFormulario(estadoInicialFormulario);
  };

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-1">Proveedores</h2>
          <p className="text-gray-500 font-medium">Gestión de proveedores</p>
        </div>
        <button 
          onClick={abrirModalCrear}
          className="bg-violet-900 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-violet-900/30 hover:-translate-y-1 hover:shadow-violet-900/40 transition-all flex items-center gap-2"
        >
          <span className="text-xl leading-none">+</span> Agregar proveedor
        </button>
      </div>

      {alerta.mostrar && <Alerta mensaje={alerta.mensaje} tipo={alerta.tipo} />}

      <Tabla 
        columnas={['ID', 'Empresa', 'Contacto', 'Teléfono', 'Email', 'Estado']}
        datos={proveedores}
        onEditar={abrirModalEditar}
        onEliminar={eliminarProveedor}
      />

      <Modal 
        isOpen={modalAbierto} 
        onClose={cerrarModal} 
        titulo={editandoId ? 'Editar proveedor' : 'Registrar proveedor'}
      >
        <form onSubmit={guardarProveedor} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Empresa</label>
            <input required type="text" name="empresa" value={formulario.empresa} onChange={handleChange} className="mt-1 w-full border border-gray-300 p-2 rounded focus:border-orange-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del contacto</label>
            <input required type="text" name="contacto" value={formulario.contacto} onChange={handleChange} className="mt-1 w-full border border-gray-300 p-2 rounded focus:border-orange-500 focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input required type="text" name="telefono" value={formulario.telefono} onChange={handleChange} className="mt-1 w-full border border-gray-300 p-2 rounded focus:border-orange-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <select name="activo" value={formulario.activo} onChange={handleChange} className="mt-1 w-full border border-gray-300 p-2 rounded focus:border-orange-500 focus:outline-none">
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input required type="email" name="email" value={formulario.email} onChange={handleChange} className="mt-1 w-full border border-gray-300 p-2 rounded focus:border-orange-500 focus:outline-none" />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={cerrarModal} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">Cancelar</button>
            <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">Guardar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
} 