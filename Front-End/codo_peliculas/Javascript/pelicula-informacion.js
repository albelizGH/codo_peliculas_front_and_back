const CLAVE_API = "4fdf950cfe85e6288de8a6fdec330711";
const URL_BASE = `https://api.themoviedb.org/3/movie/`;
const LENGUAJE_ES_MX = "?language=es-MX";
const LENGUAJE_ES = "?language=es";
//Pasando el lenguaje y el id de la pelicula me retorna el objeto json para luego trabajarlo
async function obtenerDatosPelicula(id, lenguaje) {
	const respuesta = await fetch(
		`${URL_BASE}${id}${lenguaje}&api_key=${CLAVE_API}`
	);
	return respuesta.json();
}
//Pasando el objeto json y el id de la pelicula me retorna la reseña, intenta en es-mx y si no esta hace otro fetch para buscarla en es-es
async function obtenerResena(datos, id) {
	let resena = datos.overview;
	if (resena.trim() === "") {
		const datosEs = await obtenerDatosPelicula(id, LENGUAJE_ES);
		resena =
			datosEs.overview.trim() === ""
				? "Información no disponible por el momento"
				: datosEs.overview.trim();
	}
	return resena;
}
//Formatear la fecha que obtengo desde la api a como yo quiero
function formatearFecha(fecha) {
	let [anio, mes, dia] = fecha.split("-");
	return `${dia}-${mes}-${anio}`;
}
//Formateo la duracion pasandola al formato que quiero
function obtenerDuracion(duracion) {
	if (duracion === 0) return "";
	let horas = Math.floor(duracion / 60);
	let minutos = duracion % 60;
	return `• ${horas}h ${minutos} ${minutos === 1 ? "minuto" : "minutos"}`;
}
//Busca la clave de youtube para obtener luego el trailer quedandome con el primer resultado.
async function buscarTrailer(id) {
    const obtenerClaveYoutube = async (lenguaje) => {
        const respuesta = await fetch(
            `${URL_BASE}${id}/videos?language=${lenguaje}&api_key=${CLAVE_API}`
        );
        const datos = await respuesta.json();
        const video = datos.results.find((video) => video.type === "Trailer" && !video.name.includes("Subtitulado"));//Obtengo el primer resultado
        return video ? video.key : "";//Si no tengo video entonces devuelvo ""
    };

    let claveYoutube = await obtenerClaveYoutube("es-MX");
    if (!claveYoutube) {
        claveYoutube = await obtenerClaveYoutube("es");
    }
    if (!claveYoutube) {
        claveYoutube = await obtenerClaveYoutube("en-US");
    }
    return claveYoutube;
}
//Coloco el fondo correspondiente a la pelicula
function establecerFondo(seccion, imagenFondo) {
	const gradiente =
		"linear-gradient(to right top, rgba(0, 0, 0, 0.54), rgba(177, 176, 176, 0.742))";
	seccion.style.background = `${gradiente} center center / cover, url(${imagenFondo})`;
	seccion.style.backgroundRepeat = "no-repeat";
	seccion.style.backgroundSize = "cover";
	seccion.style.backgroundPosition = "top";
}
//Dibujo la seccion 1 que contiene la portada y la review con algunos datos
async function dibujarSeccion1(datos, portada, imagenFondo, resena) {
	const seccion1 = document.querySelector(".section_1");
	const fechaLanzamiento = formatearFecha(datos.release_date);
	const generos = datos.genres.map((genero) => " " + genero.name).join();
	const duracion = obtenerDuracion(datos.runtime);

	seccion1.innerHTML = `
        <div class="section_1-contenido">
            <div class="portada-pelicula">
                <img src="${portada}" alt="imagen-pelicula"/>
            </div>
            <div class="informacion">
                <div class="tituloYClasificacion">
                    <h2>${datos.title}.</h2>
                    <p>${fechaLanzamiento} • ${generos} ${duracion}</p>
                </div>
                <div class="descripcion">
                    <h3>Reseña</h3>
                    <p>${resena}.</p>
                </div>
                <div class="infodirectores"></div>
            </div>
        </div>`;
	establecerFondo(seccion1, imagenFondo);
}
//Dibujo la seccion 2 que tiene el trailer e informacion
async function dibujarSeccion2(datos, claveYoutube) {
	const seccion2 = document.querySelector(".section_2");
	const presupuesto =
		datos.budget === 0
			? "No disponible"
			: "$" + datos.budget.toLocaleString("de-DE");
	const recaudacion =
		datos.revenue === 0
			? "No disponible"
			: "$" + datos.revenue.toLocaleString("de-DE");
	const estado = datos.status === "Released" ? "Estrenada" : "No estrenada";
	const puntuacion =
		datos.vote_average === 0
			? "No disponible"
			: Number(datos.vote_average).toFixed(1);
	const cantidadVotos =
		datos.vote_count === 0 ? "No disponible" : datos.vote_count;

	seccion2.innerHTML = `
        <div class="section_2-contenido">
            <div class="iframe-contenedor">
                <iframe id="iframe-youtube" src="https://www.youtube.com/embed/${claveYoutube}?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <div class="section_2-contenedor">
                <h3>Información</h3>
                <div class="redes">
                    <a href="#"><i class="fa-brands fa-facebook fa-2x"></i></a>
                    <a href="#"><i class="fa-brands fa-twitter fa-2x"></i></a>
                    <a href="#"><i class="fa-brands fa-instagram fa-2x"></i></a>
                    <a href="#"><i class="fa-solid fa-link fa-2x"></i></a>
                </div>
                <table>
                    <tr><td>Puntuación</td><td>${puntuacion}</td></tr>
                    <tr><td>Cantidad de votos</td><td>${cantidadVotos}</td></tr>
                    <tr><td>Costo</td><td>${presupuesto}</td></tr>
                    <tr><td>Recaudación</td><td>${recaudacion}</td></tr>
                    <tr><td>Estado</td><td>${estado}</td></tr>
                </table>
            </div>
        </div>`;
}
//Dibujo toda la pagina, tomando el id que se guarda en el local al cliquear sobre alguna pelicula
async function dibujarWeb() {
	const id = localStorage.getItem("id");
	const datos = await obtenerDatosPelicula(id, LENGUAJE_ES_MX);
	const titulo = datos.title;
	const imagenFondo =
		"https://image.tmdb.org/t/p/original" + datos.backdrop_path;
	const portada = "https://image.tmdb.org/t/p/w300" + datos.poster_path;
	const resena = await obtenerResena(datos, id);

	await dibujarSeccion1(datos, portada, imagenFondo, resena);

	const claveYoutube = await buscarTrailer(id);
	await dibujarSeccion2(datos, claveYoutube);

	dibujarActoresDirectoresEscritores(id, LENGUAJE_ES_MX, CLAVE_API);
}
//LLamo a la api para pedir informacion del cast y la dibujo
async function dibujarActoresDirectoresEscritores(id, lenguaje, claveApi) {
	const respuesta = await fetch(
		`${URL_BASE}${id}/credits${lenguaje}&api_key=${claveApi}`
	);
	const datos = await respuesta.json();

	const escritoresDirectores = [];
	const nombresRegistrados = new Set();

	datos.crew.forEach((escritorDirector) => {
		if (
			(escritorDirector.known_for_department === "Directing" ||
				escritorDirector.known_for_department === "Writing") &&
			!nombresRegistrados.has(escritorDirector.name)
		) {
			escritoresDirectores.push({
				rol: escritorDirector.known_for_department,
				nombre: escritorDirector.name,
				personaje: escritorDirector.character,
				foto: escritorDirector.profile_path
					? "https://image.tmdb.org/t/p/original" +
					  escritorDirector.profile_path
					: "",
			});
			nombresRegistrados.add(escritorDirector.name);
		}
	});

	const escritores = escritoresDirectores
		.filter((escritor) => escritor.rol === "Writing")
		.slice(0, 2);
	const directores = escritoresDirectores
		.filter((director) => director.rol === "Directing")
		.slice(0, 2);

	const arrayHTML = [];

	directores.forEach((persona) => {
		arrayHTML.push(`
            <div>
                <h4>${persona.nombre}</h4>
                <p>Director</p>
            </div>
        `);
	});

	escritores.forEach((persona) => {
		arrayHTML.push(`
            <div>
                <h4>${persona.nombre}</h4>
                <p>Escritor</p>
            </div>
        `);
	});

	document.querySelector(".infodirectores").innerHTML = arrayHTML.join("");

	const actores = [];
	const nombresGuardados = new Set();
	const actoresCast = datos.cast;

	actoresCast.slice(0, Math.min(15, actoresCast.length)).forEach((actor) => {
		if (!nombresGuardados.has(actor.name) && actor.profile_path) {
			actores.push({
				nombre: actor.name,
				personaje: actor.character,
				foto:
					"https://image.tmdb.org/t/p/original" + actor.profile_path,
			});
			nombresRegistrados.add(actor.name);
		}
	});

	const CONTENEDOR_PRINCIPAL = document.querySelector(".actores");
	const estructuraHtml = actores.map(
		(actor) => `
        <div class="actorItem">
            <img class="imgActor" src="${actor.foto}" alt="${actor.nombre}"/>
            <div class="actor_info">
                <span class="actor_personaje">${actor.personaje}</span>
                <span class="actor_nombre">${actor.nombre}</span>
            </div>
        </div>
    `
	);
	CONTENEDOR_PRINCIPAL.innerHTML = estructuraHtml.join("");
}
dibujarWeb();
