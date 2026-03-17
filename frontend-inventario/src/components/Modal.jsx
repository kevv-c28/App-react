export default function Modal({ isOpen, onClose, titulo, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-[2rem] shadow-2xl shadow-violet-900/20 w-full max-w-lg mx-4 transform transition-all">
      
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-2xl font-extrabold text-gray-800 tracking-tight">{titulo}</h3>
          <button 
            onClick={onClose}
            className="bg-gray-100 text-gray-500 hover:bg-rose-100 hover:text-rose-600 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="p-8">
          {children}
        </div>

      </div>
    </div>
  );
}