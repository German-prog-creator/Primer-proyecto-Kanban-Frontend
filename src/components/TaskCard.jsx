import React from 'react';

export default function TaskCard({ id, title, onDelete, status, onMove }) {
   
  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200 mb-3 cursor-pointer hover:shadow-md transition-shadow flex flex-col gap-3">
      <p className="text-gray-800 text-sm font-medium break-words">{title}</p>

      {/* Barra inferior con botones de movimiento y eliminar */}
      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <div className="flex gap-1">
          {/* Botón izquierda (si no está en pendiente) */}
          {status !== "pendiente" && (
            <button 
              onClick={() => onMove(id, "prev")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs transition-colors cursor-pointer"
              title="Mover a la izquierda"
            >
              ◀
            </button>
          )}

          {/* Botón derecha (si no está en completo) */}
          {status !== "completo" && (
            <button 
              onClick={() => onMove(id, "next")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs transition-colors cursor-pointer"
              title="Mover a la derecha"
            >
              ▶
            </button>
          )}
        </div>
      
      <button onClick={() => onDelete(id)} type="button"
          className="text-gray-400 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors text-xs cursor-pointer"
          title="Eliminar tarea"> 
          Eliminar 
          </button>
      </div>
    </div>
  
  );
}