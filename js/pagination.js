/**
 * @description Funcion para generr paginación con los resultados recibidos
 * @param {String} paginasTotales
 * @param {String} paginaActual
 * @param {NodeList} paginadores
 *
 */
export default function pagination(paginasTotales = 0, paginaActual = 1, paginadores) {
    paginadores.forEach(paginador => {
        paginador.innerHTML = ``;

        const paginaAnterior = document.createElement('li');
        const enlaceAnterior = document.createElement('a');
        const enlaceSiguiente = document.createElement('a');
        const paginaSiguiente = document.createElement('li');

        //Link página anterior
        paginaAnterior.classList.add('page-item');
        enlaceAnterior.classList.add('page-link');
        enlaceAnterior.href = '#';
        enlaceAnterior.setAttribute('data-id', paginaActual-1);
        enlaceAnterior.setAttribute('aria-label', 'Previous');
        enlaceAnterior.innerHTML = `<span aria-hidden="true" data-id="${paginaActual-1}">&laquo;</span><span class="sr-only">Anterior</span>`;
        paginaAnterior.appendChild(enlaceAnterior);

        //Link página siguiente
        paginaSiguiente.classList.add('page-item');
        enlaceSiguiente.classList.add('page-link');
        enlaceSiguiente.href = '#';
        enlaceSiguiente.setAttribute('data-id', paginaActual+1);
        enlaceSiguiente.setAttribute('aria-label', 'Previous');
        enlaceSiguiente.innerHTML = `<span aria-hidden="true" data-id="${paginaActual+1}">&raquo;</span><span class="sr-only">Siguiente</span>`;
        paginaSiguiente.appendChild(enlaceSiguiente);

        paginador.appendChild(paginaAnterior);
        for (let i = 0; i < 5; i++) {
            paginaActual = paginaActual++;
            const itemNumerado = document.createElement('li');
            const enlace = document.createElement('a');
            enlace.classList.add('page-link');
            enlace.setAttribute('data-id', paginaActual);
            enlace.href = '#';
            enlace.innerText = paginaActual++;
            itemNumerado.appendChild(enlace);
            paginador.appendChild(itemNumerado);
        }
        paginador.appendChild(paginaSiguiente);
    });

}