import UI from "./ui.js";
let lista = '';
let hola = 40;

document.addEventListener('DOMContentLoaded', () =>{
    let consulta = {
        tipo: 'movie',
        factorOrdenamiento: 'top_rated',
        language: 'es-CO',
        page: 1
    };

    const interfaz = new UI(consulta);

});


