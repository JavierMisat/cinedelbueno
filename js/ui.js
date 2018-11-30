import Api from "./api.js"
import card from './card.js';

export default class UI {
    constructor(consulta) {
        this.resultadosApi = new Api(consulta);
        this.resultadosHTML = document.querySelector('#resultados');
        this.init();
    }

    init() {
        this.obtenerResultados();
    }

    obtenerResultados() {
        return this.resultadosApi.realizarConsulta()
            .then(res => res.resultado.results)
            .catch(error => console.log(error));

    }

    renderizar() {
        const resultados = this.obtenerResultados();
        resultados.then(res => {
            res.map(contenido => {
                let {title, vote_average, popularity, poster_path, overview, release_date, genre_ids} = contenido;
                this.resultadosHTML.innerHTML += card(title, poster_path, vote_average, genre_ids, release_date, overview);
            });
        });
    }
}

