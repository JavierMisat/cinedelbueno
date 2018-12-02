import Api from "./api.js"
import card from './card.js';

export default class UI {
    constructor(consulta) {
        this.consulta = consulta;
        this.api = new Api(consulta);
        this.arregloGeneros = [];
        this.resultadosHTML = document.querySelector('#resultados');
        this.init();
    }

    init() {
        this.renderizar();
        this.obtenerListaGeneros();
    }

    renderizar() {
        this.api.realizarConsulta()
            .then(res => res.resultado.results)
            .then(res =>
                res.map(contenido => {
                    let generos = [];
                    switch (this.consulta.tipo) {
                        case 'tv':
                            var {name, vote_average, popularity, poster_path, overview, first_air_date, genre_ids} = contenido;

                            genre_ids.map(genero_id => {
                                this.arregloGeneros.filter((genero, index) => {
                                    if (genero[index].id === genero_id) {
                                        generos.push(genero[index].name);
                                    }
                                });
                            });
                            this.resultadosHTML.innerHTML += card(name, poster_path, vote_average, generos, first_air_date, overview);
                            break;
                        case
                        'movie':
                            var {title, vote_average, popularity, poster_path, overview, release_date, genre_ids} = contenido;

                            genre_ids.map(genero_id => {
                                this.arregloGeneros.filter((genero, index) => {
                                    if (genero[index].id === genero_id) {
                                        generos.push(genero[index].name);
                                    }
                                });
                            });

                            this.resultadosHTML.innerHTML += card(title, poster_path, vote_average, generos, release_date, overview);
                            break;
                    }
                })
            ).catch(error => console.log(error));

        console.log(this.arregloGeneros)

    }

    obtenerListaGeneros() {
        this.api.obtenerGeneros()
            .then(generos => generos.listaGeneros.genres)
            .then(generos => {
                this.arregloGeneros.push(generos);
            }).catch(error => console.log(error));
    }

}

