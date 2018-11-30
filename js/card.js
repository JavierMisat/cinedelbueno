/**
 * @description retorna un html con el card a iterar
 * @param {String} titulo
 * @param {String} rankIMDB
 * @param {String} calificacion
 * @param {Array} genero
 * @param {String} descripcion
 * @return HTMLDivElement
 */
export default function card(title,poster_path, vote_average, genre_ids, release_date, overview)
{

     return `
            <div class="col-lg-6 portfolio-item">
            <div class="card h-100">
                <a href="#"><img class="card-img-top" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt=""></a>
                <div class="card-body">
                    <h4 class="card-title">
                        <a href="#">${title}</a>
                    </h4>

                    <div class="row info-pelicula">
                        <div class="col-lg-6">
                            <label for="imdb"> <strong>IMDB RANK:</strong>
                                <span id="imdb" class="badge rounded small bg-warning"> ${vote_average} </span></label>
                        </div>
                        <div class="col-lg-6">
                            <label for="calificacion">
                                <span id="calificacion" class="float-sm-right badge-wa rounded">
                                    ${Array(Math.round(vote_average)).join(0).split(0).map((item, i) =>{
                                        console.log(item);
                                        return `<li class="oi oi-star text-warning" aria-hidden="true"></li>`;
                                    }).join('')}
                                </span></label>
                        </div>
                    </div>

                    <div class="row info-pelicula">
                        <div class="col-lg-6">
                            <label for="genero"> <strong>Género: </strong>
                                <span id="genero" class="badge-success rounded small"> Accion </span></label>
                        </div>
                        <div class="col-lg-6">
                            <label for="fecha"> <strong>Fecha Lanzamiento: </strong>
                                <span id="fecha" class="float-sm-right badge-info rounded"> ${release_date.split('-')[0]} </span></label>
                        </div>
                    </div>

                    <p class="card-text">${overview}</p>
                </div>
            </div>
        </div> `;
}