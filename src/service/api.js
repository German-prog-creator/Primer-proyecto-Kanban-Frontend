import axios from 'axios';

// Esto detecta automáticamente si estás en tu PC (localhost) 
// o si estás en Vercel (usando la variable de entorno de Render)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});