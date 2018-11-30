import Api from "./api.js"
import card from './card.js';

export default class UI {
    constructor(consulta) {
        this.consulta = consulta;
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
            let generoActuales = [];
            res.map(contenido => {
                switch (this.consulta.tipo) {
                    case 'tv':
                        var {name, vote_average, popularity, poster_path, overview, first_air_date, genre_ids} = contenido;
                        generoActuales =  this.obtenerListaGeneros(genre_ids);
                        generoActuales.forEach(e => console.log(e))


                        this.resultadosHTML.innerHTML += card(name, poster_path, vote_average, genre_ids, first_air_date, overview);
                        break;
                    case 'movie':
                        var {title, vote_average, popularity, poster_path, overview, release_date, genre_ids} = contenido;
                        genre_ids = this.obtenerListaGeneros(genre_ids);
                        this.resultadosHTML.innerHTML += card(title, poster_path, vote_average, genre_ids, release_date, overview);
                        break;
                }
            })

        }).catch(error => console.log(error));
    }

    obtenerListaGeneros(genre_ids) {
        let listaGeneros = [];

        genre_ids.map(genre_id => {
            let nombre =  this.obtenerNombreGenero(genre_id);
            listaGeneros.push(nombre);
        });

        return listaGeneros;
    }

    obtenerNombreGenero(genre_id){
        let listado = [];
        this.resultadosApi.obtenerGeneros()
            .then(generos => {
                const objGeneros = generos.listaGeneros.genres;
                objGeneros.map((genero, index) => {
                    if(genero.id == genre_id){
                        listado[index] = genero;
                    }
                });
            })
            .catch(error => console.log(error));
        return listado;
    }
}

