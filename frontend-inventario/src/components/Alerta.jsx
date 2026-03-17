export default function Alerta({ mensaje, tipo }) {
  const colores = tipo === 'error' 
    ? 'bg-red-100 border-red-400 text-red-700' 
    : 'bg-green-100 border-green-400 text-green-700';

  return (
    <div className={`border-l-4 p-4 mb-4 shadow-sm ${colores}`}>
      <p className="font-medium">{mensaje}</p>
    </div>
  );
}