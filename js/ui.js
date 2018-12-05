import Api from "./api.js"
import card from './card.js';
import loaderAnimation2 from './loader2.js';
import pagination from './pagination.js';

export default class UI {
    constructor() {
        this.resultadosAPI = null;
        this.paginasTotales = 0;
        this.resusltadosTotales = 0;
        this.paginaActual = 1;
        this.arregloGeneros = [];
        this.resultadosHTML = document.querySelector('#resultados');
        this.init();
    }

    init() {
        this.datosConsulta = {
            tipo: 'movie',
            factorOrdenamiento: 'top_rated',
            language: 'es-CO',
            page: this.paginaActual
        };
        this.resultadosHTML.innerHTML = ``;
        this.consulta = this.datosConsulta;
        this.api = new Api(this.datosConsulta);
        this.obtenerListaGeneros();
        this.paginarResultados();
        this.renderizar();
    }

    renderizar() {
        UI.mostrarLoader();
        setTimeout(() => {
            this.api.realizarConsulta()
                .then(res => {
                    this.resultadosAPI = res;
                    this.paginasTotales = res.resultado.total_pages;
                    this.resusltadosTotales = res.resultado.total_results;
                    return res.resultado.results;
                })
                .then(res => {
                    document.querySelector('#tituloPrincipal').innerHTML = `Tenemos más de ${this.resusltadosTotales} Películas <small>(Recomendadas)</small>`;
                    res.map(contenido => {
                        console.log(contenido)
                        switch (this.consulta.tipo) {
                            case 'tv':
                                var {name, vote_average, popularity, poster_path, overview, first_air_date, genre_ids} = contenido;
                                genre_ids = this.obtenerGenerosMovieOrTV(genre_ids);
                                this.resultadosHTML.innerHTML += card(name, poster_path, vote_average, genre_ids, first_air_date, overview);
                                break;
                            case 'movie':
                                var {title, vote_average, popularity, poster_path, overview, release_date, genre_ids} = contenido;
                                genre_ids = this.obtenerGenerosMovieOrTV(genre_ids);
                                this.resultadosHTML.innerHTML += card(title, poster_path, vote_average, genre_ids, release_date, overview);
                                break;
                        }
                    })
                })
                .then(() => jQuery('#modalCargaPagina').modal('toggle'))
                .catch(error => console.log(error));
        }, 1000);
    }

    obtenerListaGeneros() {
        this.api.obtenerGeneros()
            .then(generos => generos.listaGeneros.genres)
            .then(generos => {
                this.arregloGeneros.push(generos);
            }).catch(error => console.log(error));
    }

    obtenerGenerosMovieOrTV(genre_ids) {
        let generos = [];
        this.arregloGeneros[0].map(genero => {
            genre_ids.filter(genero_id => {
                if (genero_id === genero.id) {
                    generos.push(genero.name);
                }
            });
        });
        return generos;
    }

    static mostrarLoader() {
        const modal = document.querySelector('#modalCargaPagina .modal-dialog');
        modal.innerHTML = loaderAnimation2();
        jQuery('#modalCargaPagina').modal({show: true, backdrop: 'static'});
    }

    paginarResultados() {
        const paginadores = document.querySelectorAll('.pagination');
        pagination(this.paginasTotales, this.paginaActual, paginadores);
        this.pasarPagina();
    }

    pasarPagina() {
        document.body.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.getAttribute('data-id')) {
                this.resultadosHTML.innerHTML = ``;
                this.paginaActual = e.target.getAttribute('data-id');
                this.init();
            }
        });
    }

}

