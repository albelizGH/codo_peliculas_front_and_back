const urlNewUser = "http://localhost:8080/webapp/register";
const botonRegistrar=document.getElementById("boton-registro");

function validarRegistro(nombre, apellido, email, contrasenia, fechaNacimiento, pais) {
    if (nombre.trim() === '' || apellido.trim() === '' || email.trim() === '' || contrasenia.trim() === '' || fechaNacimiento.trim() === '' || pais === '') {
        alert('Completa todos los campos.');
        return false;
    }

    let correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!correoRegex.test(email)) {
        alert('Introduce un correo electrónico válido.');
        return false;
    }

    return true;
}

function registrarUsuario(event) {
    event.preventDefault(); 


    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const contrasenia = document.getElementById('password').value;
    const fechaNacimiento = document.getElementById('fecha').value;
    const pais = document.getElementById('pais').value;

    if (validarRegistro(nombre, apellido, email, contrasenia, fechaNacimiento, pais)) {

        const json = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            contrasenia: contrasenia,
            fechaNacimiento: fechaNacimiento,
            pais: pais,
        };
        
        fetch(urlNewUser, {
            method: "POST", 
            body: JSON.stringify(json),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Registro completado con exito. Ya puede iniciar sesión");
                    window.location.href = "../index.html"
                } else {
                    throw new Error("Error al registrar usuario");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Ha ocurrido un error");
            });
    }
}

botonRegistrar.addEventListener('click',registrarUsuario);





