const API_KEY = "4fdf950cfe85e6288de8a6fdec330711";
let pagina = 1;
const BOTON_SIGUIENTE = document.querySelector(".button-next");
const BOTON_ATRAS = document.querySelector(".button-back");
const LOGO = document.querySelector(".logo");
const BUSCADOR = document.getElementById("buscador");
let busquedaInicio = localStorage.getItem("busquedaInicial");
let cantidadPaginasEncontradas;

async function dibujarBusqueda(pagina) {
	const CONTENEDOR_PRINCIPAL = document.querySelector(".cont-all-movies");
	const URL_IMAGEN_BASICA = "https://image.tmdb.org/t/p/w300";
	let response = await fetch(
		`https://api.themoviedb.org/3/search/movie?query=${busquedaInicio}&language=es-mx&page=${pagina}&api_key=${API_KEY}`
	);
	let data = await response.json();
	cantidadPaginasEncontradas = data.total_pages;
	let resultados = data.results;
	if (resultados.length === 0) {
		BOTON_SIGUIENTE.style.display = "none";
		BOTON_ATRAS.style.display = "none";
		document.querySelector(".titulo-div").style.marginBottom = "4rem";
		CONTENEDOR_PRINCIPAL.innerHTML = `<div class="titulo-div"><p>No se encontraron resultados para "${busquedaInicio}"</p></div>`;
		return;
	}
	//Restablezco los estilos
	BOTON_SIGUIENTE.style.display = "block";
	BOTON_ATRAS.style.display = "block";
	document.querySelector(".titulo-div").style.marginBottom = "";

	resultados.sort(
		(a, b) => new Date(b.release_date) - new Date(a.release_date)
	);
	console.log(resultados);
	let estructuraHtml = resultados
		.filter((pelicula) => pelicula.poster_path != null)
		.map((pelicula) => {
			return `
                <div class="div-cont-img-movie" data-id="${pelicula.id}">
                    <a href="../html/pelicula-informacion.html">
                    <img
                        src=${URL_IMAGEN_BASICA}${pelicula.poster_path}
                        alt="${pelicula.title}"
                        class="size-movie"
                    /></a>
                    <div class="movie-title">${pelicula.title}</div>
                </div>`;
		});
	CONTENEDOR_PRINCIPAL.innerHTML = `${estructuraHtml.join("")}`;

	// Asignar evento después de renderizar las películas
	const peliculasTendencias = document.querySelectorAll(
		".div-cont-img-movie"
	);
	peliculasTendencias.forEach((pelicula) => {
		pelicula.addEventListener("click", function () {
			let id = this.getAttribute("data-id");
			localStorage.setItem("id", id);
		});
	});
}

async function buscar(pagina) {
	let busqueda = BUSCADOR.value;
	const CONTENEDOR_PRINCIPAL = document.querySelector(".cont-all-movies");
	const URL_IMAGEN_BASICA = "https://image.tmdb.org/t/p/w300";
	let response = await fetch(
		`https://api.themoviedb.org/3/search/movie?query=${busqueda}&language=es-mx&page=${pagina}&api_key=${API_KEY}`
	);
	let data = await response.json();
	let resultados = data.results;
	if (resultados.length === 0) {
		BOTON_SIGUIENTE.style.display = "none";
		BOTON_ATRAS.style.display = "none";
		document.querySelector(".titulo-div").style.marginBottom = "4rem";
		CONTENEDOR_PRINCIPAL.innerHTML = `<div class="titulo-div"><p>No se encontraron resultados para "${busqueda}"</p></div>`;
		return;
	}
	// Restablecer estilos desaparecidos anteriormente
	BOTON_SIGUIENTE.style.display = "block";
	BOTON_ATRAS.style.display = "block";
	document.querySelector(".titulo-div").style.marginBottom = "";

	resultados.sort(
		(a, b) => new Date(b.release_date) - new Date(a.release_date)
	);
	console.log(resultados);
	let estructuraHtml = resultados
		.filter((pelicula) => pelicula.poster_path != null)
		.map((pelicula) => {
			return `
                <div class="div-cont-img-movie" data-id="${pelicula.id}">
                    <a href="../html/pelicula-informacion.html">
                    <img
                        src=${URL_IMAGEN_BASICA}${pelicula.poster_path}
                        alt="${pelicula.title}"
                        class="size-movie"
                    /></a>
                    <div class="movie-title">${pelicula.title}</div>
                </div>`;
		});
	CONTENEDOR_PRINCIPAL.innerHTML = `${estructuraHtml.join("")}`;

	// Asignar evento después de renderizar las películas
	const peliculasTendencias = document.querySelectorAll(
		".div-cont-img-movie"
	);
	peliculasTendencias.forEach((pelicula) => {
		pelicula.addEventListener("click", function () {
			let id = this.getAttribute("data-id");
			localStorage.setItem("id", id);
		});
	});
}

BOTON_SIGUIENTE.addEventListener("click", () => {
	if (cantidadPaginasEncontradas == pagina) {
		return;
	}
	pagina++;
	document
		.getElementById("tendencias")
		.scrollIntoView({ behavior: "smooth" });
	dibujarBusqueda(pagina);
});

BOTON_ATRAS.addEventListener("click", () => {
	if (pagina == 1) {
		return;
	}
	pagina--;
	document
		.getElementById("tendencias")
		.scrollIntoView({ behavior: "smooth" });
	dibujarBusqueda(pagina);
});

LOGO.addEventListener("click", () => {
	dibujarBusqueda(1);
});

document
	.querySelector(".section-busqueda-boton")
	.addEventListener("click", () => {
		busqueda = BUSCADOR.value;
		localStorage.setItem("busquedaInicial", BUSCADOR.value);
		buscar(1);
	});

dibujarBusqueda(1);
