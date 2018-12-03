import UI from "./ui.js";

document.addEventListener('DOMContentLoaded', () => {
    let consulta = {
        tipo: 'movie',
        factorOrdenamiento: 'top_rated',
        language: 'es-CO',
        page: 1
    };
    const interfaz = new UI(consulta);
});


