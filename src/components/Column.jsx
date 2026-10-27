import React from 'react';  /*Se importa las librerias de react*/
import TaskCard from './TaskCard';

export default function Column({ title, count, tasks, onDelete, onMove }) { /*Definimos una funcion llamada columna y la exporta(la hace "publica")*/
  return (
    <div className="bg-gray-100 w-800 rounded-xl p-4 flex flex-col h-[500px] shadow-md border border-gray-200">
      {/* Cabecera de la columna */}
      <div className="flex justify-center items-center mb-4">
        <h2 className="font-bold text-gray-700">{title}</h2>
        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full font-semibold">
          {count}
        </span>
      </div>

        
      {/* Cuerpo donde irán las tarjetas */}
      <div className="flex-1 overflow-y-auto">
        {tasks.length === 0 && (
          <p className="text-gray-500 text-sm text-center mt-10">No hay tareas aquí</p>
        )}

       {/* Al ser una etiqueta de prueba y verificacion que estubiera correcta se Elimina esta etiqueta y evitar una tarjeta adicional que no queremos y no necesitamos 
          <p className="text-gray-400 text-sm text-center mt-10"><TaskCard title="Mi primera tarea de prueba"/></p>*/}

        {tasks && tasks.map((task) => (
          <TaskCard key={task.id} id={task.id} title={task.title} onDelete={onDelete} onMove={onMove}/>
        ))}
      </div>
    </div>
    
  );
  
}
