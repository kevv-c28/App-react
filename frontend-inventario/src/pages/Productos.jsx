import { useState, useEffect } from 'react';
import axios from 'axios';
import Tabla from '../components/Tabla';
import Modal from '../components/Modal';
import Alerta from '../components/Alerta';

export default function Productos() {
  const [productos, setProductos] = useState([]); 
  const [modalAbierto, setModalAbierto] = useState(false);
  const [alerta, setAlerta] = useState({ mostrar: false, mensaje: '', tipo: '' });

  const estadoInicialFormulario = { nombre: '', descripcion: '', precio: '', stock: '', categoria: '' };
  const [formulario, setFormulario] = useState(estadoInicialFormulario);
  const [editandoId, setEditandoId] = useState(null); 



  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const respuesta = await axios.get('https://api-nikolokos.onrender.com/api/productos');
      setProductos(respuesta.data);
    } catch (error) {
      console.log("Error al conectar con la API, hubo algun pedo. ", "Error.");
    }
  };



  const guardarProducto = async (e) => {
    e.preventDefault(); 
    try {
      if (editandoId) {
        await axios.put(`https://api-nikolokos.onrender.com/api/productos/${editandoId}`, formulario);
        mostrarAlerta('Producto actualizado correctamente, nikoloko', 'exito');
      } else {
        await axios.post('https://api-nikolokos.onrender.com/api/productos', formulario);
        mostrarAlerta('Producto creado correctamente. nikoloko.', );
      }
      obtenerProductos();
      cerrarModal();
    } catch (error) {
      mostrarAlerta('Error al guardar el producto, tonoto.', 'error');
      cerrarModal();
    }
  };



  const eliminarProducto = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?, piensalo BIEEEEN.')) {
      try {
        await axios.delete(`https://api-nikolokos.onrender.com/api/productos/${id}`);
        mostrarAlerta('Producto eliminado correctamente', 'exito');
        obtenerProductos();
      } catch (error) {
        mostrarAlerta('Producto eliminado', 'exito');
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

  const abrirModalEditar = (producto) => {
    setFormulario(producto);
    setEditandoId(producto.id);
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
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-1">Productos</h2>
          <p className="text-gray-500 font-medium">Gestiona el inventario</p>
        </div>
        <button 
          onClick={abrirModalCrear}
          className="bg-violet-900 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-violet-900/30 hover:-translate-y-1 hover:shadow-violet-900/40 transition-all flex items-center gap-2"
        >
          <span className="text-xl leading-none">+</span> Agregar Producto
        </button>
      </div>
      {alerta.mostrar && <Alerta mensaje={alerta.mensaje} tipo={alerta.tipo} />}

      <Tabla 
        columnas={['ID', 'Nombre', 'Descripción', 'Precio', 'Stock', 'Categoría']}
        datos={productos}
        onEditar={abrirModalEditar}
        onEliminar={eliminarProducto}
      />

      <Modal 
        isOpen={modalAbierto} 
        onClose={cerrarModal} 
        titulo={editandoId ? 'Editar producto' : 'Nuevo producto'}
      >
        <form onSubmit={guardarProducto} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input required type="text" name="nombre" value={formulario.nombre} onChange={handleChange} className="mt-1 w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <input required type="text" name="descripcion" value={formulario.descripcion} onChange={handleChange} className="mt-1 w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Precio</label>
              <input required type="number" name="precio" value={formulario.precio} onChange={handleChange} className="mt-1 w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input required type="number" name="stock" value={formulario.stock} onChange={handleChange} className="mt-1 w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <input required type="text" name="categoria" value={formulario.categoria} onChange={handleChange} className="mt-1 w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none" />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={cerrarModal} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">Cancelar</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}