import UI from "./ui.js";
let lista = '';
let hola = 40;

document.addEventListener('DOMContentLoaded', () =>{
    let consulta = {
        tipo: 'tv',
        factorOrdenamiento: 'top_rated',
        language: 'es-CO',
        page: 2
    };

    const interfaz = new UI(consulta);
    interfaz.renderizar();
});


