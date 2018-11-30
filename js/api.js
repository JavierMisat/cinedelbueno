export default class Api {
    /**
     * @description Obtiene un arreglo con todos los parametros basicos segun el tipo de consulta
     * @param {Array} consulta
     */
    constructor(consulta = []) {
        this.consulta = consulta;
        this.urlConsulta = 'https://api.themoviedb.org/3/';
        this.urlGeneros = 'https://api.themoviedb.org/3/genre/';
        this.apiKey = `e237402b86941fee4a4fbc87710062ff`;
        this.language = 'es-CO';
        this.init();
    }

    init() {
        this.construirConsulta();
    }

    construirConsulta() {
        const tipoConsulta = this.consulta.factorOrdenamiento;
        switch (tipoConsulta) {
            case 'top_rated':
                let {language, page, factorOrdenamiento, tipo} = this.consulta;
                this.language = language;
                this.urlConsulta += `${tipo}/${factorOrdenamiento}?&api_key=${this.apiKey}&language=${this.language}&page=${page}`;
                this.realizarConsulta();
                break;
        }
    }

    async realizarConsulta() {
        //Fetch a la API
        const requestApi = await fetch
        (this.urlConsulta);

        //Recuperando datos en JSON
        const resultadosContenido = await requestApi.json();

        return {
            resultado: resultadosContenido,
            tipo: this.consulta.tipo,
            factorOrdenamiento: this.consulta.factorOrdenamiento

        };
    }

    async obtenerGeneros(genre_ids) {
        //Fetch a la API
        const requestApi = await fetch
        (this.urlGeneros + `${this.consulta.tipo}/list?&api_key=${this.apiKey}&language=${this.language}`);

        //Recuperando generos en formato JSON
        const listaGeneros = await requestApi.json();

        return {
            listaGeneros: listaGeneros
        };
    }

}

