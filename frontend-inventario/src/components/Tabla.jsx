export default function Tabla({ columnas, datos, onEditar, onEliminar }) {
  return (
    <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-violet-900/70 uppercase bg-gray-50/50">
            <tr>
              {columnas.map((columna, index) => (
                <th key={index} className="px-8 py-5 font-bold tracking-wider">
                  {columna}
                </th>
              ))}
              <th className="px-8 py-5 font-bold text-center tracking-wider">Acciones</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-50">
            {datos.length === 0 ? (
              <tr>
                <td colSpan={columnas.length + 1} className="px-8 py-10 text-center text-gray-400 font-medium">
                  No hay registros.
                </td>
              </tr>
            ) : (
              datos.map((fila) => (
                <tr key={fila.id} className="hover:bg-violet-50/30 transition-colors group">
                  {Object.values(fila).map((valor, index) => (
                    <td key={index} className="px-8 py-5 font-medium text-gray-700">
                      {valor}
                    </td>
                  ))}
                  
                  <td className="px-8 py-4 flex justify-center gap-3">
                    <button 
                      onClick={() => onEditar(fila)}
                      className="bg-violet-50 text-violet-700 hover:bg-violet-100 font-bold py-2 px-4 rounded-xl transition-colors"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => onEliminar(fila.id)}
                      className="bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold py-2 px-4 rounded-xl transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}