const urlGetUsers = "http://localhost:8080/webapp/getusers";
const urlGetUserByEmail = "http://localhost:8080/webapp/getuserbyemail";
const urlUpdateUser = "http://localhost:8080/webapp/updateuser";
let cambioCorreo = false;
let cambioContrasenia = false;

const botonCerrarSesion = document.getElementById("cerrarSesion");
const tablaUsers = document.querySelector(".tablaUsers");

async function obtenerUsuarios() {
	try {
		const response = await fetch(urlGetUsers);
		if (!response.ok) {
			throw new Error("Error al obtener usuarios");
		}
		const data = await response.json();
		dibujarTabla(data);
	} catch (error) {
		console.error("Error:", error);
		alert("Error al obtener usuarios");
	}
}

async function obtenerMisDatos() {
	let email = localStorage.getItem("email");
	if (!email) {
		console.error("No se ha encontrado el correo en localStorage");
		return;
	}
	try {
		const response = await fetch(
			`${urlGetUserByEmail}?email=${encodeURIComponent(email)}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const data = await response.json();
		dibujarMisDatos(data);
	} catch (error) {
		console.error("Error:", error);
	}
}

async function deleteUser(id) {
	if (confirm("¿Está seguro de que desea eliminar este usuario?")) {
		try {
			const response = await fetch(
				`http://localhost:8080/webapp/deleteuser?id=${id}`,
				{
					method: "DELETE",
				}
			);

			if (!response.ok) {
				throw new Error("Error al eliminar el usuario");
			}

			alert("Usuario eliminado con éxito");
			// Recargar la página para reflejar los cambios
			location.reload();
		} catch (error) {
			console.error("Error:", error);
			alert("Error al eliminar el usuario");
		}
	}
}

function dibujarTabla(datos) {
	const tablaPadre = document.querySelector(".tablaUsers");
	let datosBodyTabla = "";
	for (let i = 1; i < datos.length; i++) {
		datosBodyTabla += `<tr>
        <th scope="row">${datos[i].id}</th>
        <td>${datos[i].nombre}</td>
        <td>${datos[i].apellido}</td>
        <td>${datos[i].email}</td>
        <td>${datos[i].fechaNacimiento}</td>
        <td>${datos[i].pais}</td>
        <td class="text-center"><button class="delete-button btn btn-danger" onclick="deleteUser(${datos[i].id})">Eliminar</button></td>
    </tr>`;
	}

	tablaPadre.innerHTML =
		`<div class="container mt-4">
        <table class="table table-bordered table-dark">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Email</th>
                    <th scope="col">Fecha de nacimiento</th>
                    <th scope="col">País</th>
                    <th scope="col" class="text-center">Eliminar usuario</th>
                </tr>
            </thead>
            <tbody>` +
		datosBodyTabla +
		`</tbody>
        </table>
    </div>`;
}

function dibujarMisDatos(datos) {
	const tablaPadre = document.querySelector(".tablaUsers");
	tablaPadre.innerHTML = `<h4 class="titulo-tabla-user">Mis datos</h4>
        <div class="container mt-4">
        <table class="table table-bordered table-dark">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Email</th>
                    <th scope="col">Fecha de nacimiento</th>
                    <th scope="col">País</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row" id="miID">${datos.id}</th>
                    <td>${datos.nombre}</td>
                    <td>${datos.apellido}</td>
                    <td>${datos.email}</td>
                    <td>${datos.fechaNacimiento}</td>
                    <td>${datos.pais}</td>
                </tr>
            </tbody>
        </table>
    </div>`;
}

function dibujarUpdate() {
	const tablaPadre = document.querySelector(".tablaUsers");
	const div = document.createElement("div");
	div.innerHTML = ` 
    <div class="containerUpdate">
        <h4 class="titulo-tabla-user">Actualizar datos</h4>
        <div class="registro-container">
            <div class="registro-container-interno">
                <form id="registroForm">
                    <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        placeholder="Nombre"
                    />
                    <input
                        type="text"
                        name="apellido"
                        id="apellido"
                        placeholder="Apellido"
                    />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        name="contrasenia"
                        id="password"
                        placeholder="Contraseña"
                    />
                    <input
                        type="date"
                        name="fechaNacimiento"
                        id="fecha"
                        placeholder="dd/mm/aaaa"
                    />
                    <select name="pais" id="pais" required>
                        <option value="Argentina">Argentina</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Brasil">Brasil</option>
                        <option value="Chile">Chile</option>
                        <option value="Peru">Perú</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Ecuador">Ecuador</option>
                    </select>
                    <button class="boton-registro" type="submit" id="boton-actualizar">
                        Actualizar
                    </button>
                </form>
            </div>
        </div>
    </div>`;
	tablaPadre.appendChild(div);
}

async function actualizarDatos() {
	const id = document.getElementById("miID").textContent.trim(); // Obtener el contenido del ID
	const nombre = document.getElementById("nombre").value.trim() || null;
	const apellido = document.getElementById("apellido").value.trim() || null;
	const email = document.getElementById("email").value.trim() || null;
	const contrasenia =
		document.getElementById("password").value.trim() || null;
	const fechaNacimiento =
		document.getElementById("fecha").value.trim() || null;
	const pais = document.getElementById("pais").value || null;

	if (contrasenia != null) {
		cambioContrasenia = true;
	}
	if (email != null) {
		cambioCorreo = true;
	}

	const json = {
		id: id,
		nombre: nombre,
		apellido: apellido,
		email: email,
		contrasenia: contrasenia,
		fechaNacimiento: fechaNacimiento,
		pais: pais,
	};

	fetch(urlUpdateUser, {
		method: "PUT", // Cambiado de POST a PUT
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(json),
	})
		.then((response) => {
			if (response.ok) {
				obtenerMisDatos();
                dibujarWeb();
			} else {
				throw new Error("Error al actualizar datos");
			}
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

function cerrarSesion() {
	localStorage.setItem("typeUser", "");
	localStorage.setItem("email", "");
	window.location.href = "../index.html";
	if (tablaUsers) {
		//Para evitar que vean los datos solo poniendo la url de la sesion
		tablaUsers.remove();
	}
}

botonCerrarSesion.addEventListener("click", function (event) {
	event.preventDefault();
	cerrarSesion();
});

async function dibujarWeb() {
	if (localStorage.getItem("typeUser") === "admin") {
		obtenerUsuarios();
	} else if (localStorage.getItem("typeUser") === "normal") {
		await obtenerMisDatos();
		dibujarUpdate();
		const botonActualizar = document.getElementById("boton-actualizar");
		botonActualizar.addEventListener("click", function (event) {
			event.preventDefault();
			actualizarDatos();
			if (cambioContrasenia == true || cambioCorreo == true) {
				cambioContrasenia == false;
				cambioCorreo == false;
				alert("Vuelva a iniciar sesión");
				cerrarSesion();
			} else {
				dibujarWeb();
			}
		});
	}
}

dibujarWeb();
