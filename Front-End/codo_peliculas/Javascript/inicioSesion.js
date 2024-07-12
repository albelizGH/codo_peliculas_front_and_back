function validarCampoVacio(valor, mensaje) {
    if (valor.trim() === "") {
        alert(mensaje);
        return false;
    }
    return true;
}

function validarCorreoElectronico(correo) {
    let correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!correoRegex.test(correo)) {
        alert("Correo electrónico no válido.");
        return false;
    }
    return true;
}

document.getElementById("inicioSesionForm").addEventListener("submit", async function(event) {
    event.preventDefault(); 
    
    let correo = document.getElementById("email").value.trim();
    let contrasenia = document.getElementById("password").value;

    if (!validarCampoVacio(correo, "Correo electrónico vacío.")) {
        return;
    }
    if (!validarCorreoElectronico(correo)) {
        return;
    }

    if (!validarCampoVacio(contrasenia, "Contraseña vacía.")) {
        return;
    }

    let json = {
        email: correo,
        contrasenia: contrasenia
    };

    try {
        const response = await fetch('http://localhost:8080/webapp/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        });

        if (!response.ok) {
            throw new Error('Error al iniciar sesión');
        }

        const data = await response.json();
        if (data.usuarioYContraseña) {
            localStorage.setItem("email", correo); 
            console.log(localStorage.getItem("email"));

            if (data.admin) {
                localStorage.setItem("typeUser", "admin");
            } else {
                localStorage.setItem("typeUser", "normal");
            }

            window.location.href = 'perfil.html';
        } else {
            alert('Correo o contraseña incorrectos');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al iniciar sesión');
    }
});
