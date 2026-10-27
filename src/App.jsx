import './index.css';
import Column from './components/Column';
import {useState, useEffect} from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';

export default function App() {
  const [tareas, setTareas] = useState ([]);
      {/* Se quita esta parte para dejar el arreglo vacio e ir agregando las tareas por medio del boton Agregar
      {id: 1, title: "Aprender ingles", status: "progreso"},
      {id: 2, title: "Practicar logica", status: "completo"},
      {id: 3, title: "Gestionar proyecto", status: "progreso"},
      {id: 4, title: "Ciberseguridad", status: "pendiente"}  */}
      
    // Nuevo estado para guardar lo que el usuario escribe en el input
  const [nuevaTareaText, setNuevaTareaText] = useState("");

  // Cargar tareas del backend al iniciar la página
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data =await getTasks();
      setTareas(data);
    } catch (error){
      console.error("Error al conectar con el backend", error);
    }
  };

  // Función que se ejecutará cuando se envíe el formulario
  // Antes teniamos  const handleSubmit = (e) => {, solamente con la (e) ahora le agregamos async antes 
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue sola por defecto
    
    // Si el input está vacío, no hacemos nada
    if (nuevaTareaText.trim() === "") return;

    // Creamos el objeto de la nueva tarea
  try {
    const nuevaTareaData = {
  // id: Date.now(), Quitamos el id unico que inventamos para poder colocar un try y que ese id lo genere el backend (o la base de datos) y no el frontend
  title: nuevaTareaText,
  status: "pendiente" // Se escribe esta parte para que aparezca en la primera columna
};
  const savedTarea = await createTask(nuevaTareaData);
    // Actualizamos el estado de las tareas agregando la nueva al final
    setTareas([...tareas, savedTarea]); // Modificamos esta linea antes era setTareas([...tareas, nuevaTarea]); y cambiamos nuevaTarea por savedTarea
    // Limpiamos el input borrando el texto escrito
    setNuevaTareaText("");
} catch (error) {
  console.error("Error al crear tarea", error);
}
};
    // Función para eliminar una tarea
    // Antes teniamos  const eliminarTarea = (id) => {  pero ahora posterior debe ir con async (id)
    const eliminarTarea = async (id) => {
      try { //agregamos el try para el backend
        await deleteTask (id);
        setTareas(tareas.filter((task) => task.id !== id));
      } catch (error) {
        console.error("Error al eliminar tarea", error);
      }
    };
    // Se quita esta linea ya que ingresamos el try por si genera error la elimincacion de la tarea
    /* .filter() devuelve un nuevo arreglo manteniendo solo las tareas cuyo id sea DIFERENTE al que queremos borrar 
        const tareasActualizadas = tareas.filter((task) => task.id !== id);
          setTareas(tareasActualizadas);
          }; */
    
    // Pasa igual que los anteriores agregamos el async 
        const cambiarEstado = async (id, direccion) => {
    const estados = ["pendiente", "progreso", "completo"];
    /* Quitamos esta linea para agregar nuevas lineas 
    setTareas(tareas.map(task => {
      if (task.id === id) {
        const currentIndex = estados.indexOf(task.status);
        let newIndex = currentIndex; */
    // Encontrar la tarea actual para saber el titulo y el nuevo estado
      const tareaActual = tareas.find (t => t.id === id);
      if (!tareaActual) return;

      const currentIndex = estados.indexOf(tareaActual.status);
      let newIndex = currentIndex;
        
        if (direccion === "next" && currentIndex < estados.length - 1) {
          newIndex = currentIndex + 1;
        } else if (direccion === "prev" && currentIndex > 0) {
          newIndex = currentIndex - 1;
        }
        const nuevoEstado = estados[newIndex];
      // Actualización optimista local
        setTareas(tareas.map(task => {
        if (task.id === id) {
        return { ...task, status: nuevoEstado};
      }
      return task;
    }));
    // Cambio en la base de datos de Python
    try { 
      await updateTask(id,{
        title: tareaActual.title,
        status: nuevoEstado
        
      });
    }catch (error){
      console.error("Error al actualizar estado", error);
      fetchTasks(); // Si llega a fallar el servidor se recarga
    }
  };
  
        const tareasPendientes = tareas.filter((task) => task.status === "pendiente");
        const tareasEnProceso = tareas.filter((task) => task.status === "progreso");
        const tareasCompletadas = tareas.filter((task) => task.status === "completo");
  
  return (
    
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-8 flex justify-center">Tablero Kanban</h1>
      {/* Formulario para agregar tarea */}
      <form onSubmit={handleSubmit} className="mb-8 flex gap-3 max-w-md">
        <input
          type="text"
          placeholder="¿Ingresa la nueva tarea?"
          value={nuevaTareaText}
          onChange={(e) => setNuevaTareaText(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer"
        >
          Agregar
        </button>
      </form>

      {/* Contenedor principal que centra las columnas si caben, o permite scroll si la pantalla es chica */}
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6 overflow-x-auto pb-4">

          {/* Se quita esta linea para que no se dupliquen las columnas y dejamos las nuevas abajo para que queden dinamicas las columnas
          <Column title="Pendiente Por Hacer" count={tareas.length} tasks={tareas} onDelete={eliminarTarea} />
          <Column title="En Proceso" count={0} tasks={[]}/>
          <Column title="Completas" count={0} tasks={[]}/> */}

          <Column 
          title="Pendiente Por Hacer" 
          count={tareasPendientes.length} 
          tasks={tareasPendientes} 
          onDelete={eliminarTarea} 
          onMove={cambiarEstado}
          />
          <Column 
            title="En Proceso" 
            count={tareasEnProceso.length} 
            tasks={tareasEnProceso} 
            onDelete={eliminarTarea}
            onMove={cambiarEstado} 
          />
          <Column 
            title="Completas" 
            count={tareasCompletadas.length} 
            tasks={tareasCompletadas} 
            onDelete={eliminarTarea} 
            onMove={cambiarEstado}
          />
        </div>
      </div>
    </div>
    
  );
  
}
