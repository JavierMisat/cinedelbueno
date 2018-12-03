import Api from "./api.js"
import card from './card.js';
import loaderAnimation2 from './loader2.js';

export default class UI {
    constructor(consulta) {
        this.consulta = consulta;
        this.api = new Api(consulta);
        this.arregloGeneros = [];
        this.resultadosHTML = document.querySelector('#resultados');
        this.loaderAnimation = document.querySelector('#loader');
        this.init();
    }

    init() {
        this.obtenerListaGeneros();
        this.renderizar();
    }

    renderizar() {
        this.loaderAnimation.innerHTML = loaderAnimation2();
        this.loaderAnimation.style.display = 'block';

        this.api.realizarConsulta()
            .then(res => {
               return  res.resultado.results;
            })
            .then(res => {
                res.map(contenido => {

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
            .then(() => document.querySelector('#loader').style.display = 'none')
            .catch(error => console.log(error));
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
}

