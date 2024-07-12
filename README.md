# AB-Movies 🎬

AB-Movies es una aplicación web dedicada a gestionar y mostrar información sobre películas. Permite a los usuarios explorar películas, ver detalles como actores, fechas de lanzamiento, ganancias en taquilla, y más. Además, incluye características de registro, simulación de inicio de sesión y gestión de usuarios.

## Características

### Frontend

- **Interfaz de Usuario Intuitiva:** Diseño visual atractivo y fácil de navegar.
- **Diseño Responsivo:** Adaptabilidad a diversos dispositivos móviles y de escritorio.
- **Estructura de Navegación Clara:** Facilita la exploración y acceso a diferentes secciones.
- **Presentación de Películas:** Visualización de tarjetas con información básica y detalles detallados de películas.
- **Simulación de Inicio de Sesión:** Registro y almacenamiento local de credenciales para el inicio de sesión.

### Backend

- **Base de Datos:** Utiliza MySQL con la base de datos "movies-codo".
- **Endpoints y Servicios:** Implementación de servicios para operaciones CRUD de usuarios.
- **Integración con Frontend:** Comunicación API para transferencia de datos entre frontend y backend.

## Tecnologías Utilizadas

### Frontend

- HTML5, CSS3, JavaScript
- Bootstrap para estilos y componentes de UI
- Fetch API para comunicación con el backend
- Almacenamiento Local para guardar datos locales

### Backend

- Java con Servlets para lógica del lado servidor
- MySQL como sistema de gestión de base de datos
- Jackson para mapeo de objetos Java a JSON
- Maven para gestión de dependencias y construcción del proyecto

## Instalación y Uso

### Requisitos Previos

- JDK (Java Development Kit)
- Apache Tomcat u otro contenedor de Servlets Java
- Servidor de base de datos MySQL

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu_usuario/AB-Movies.git
   ```

2. Configuración del Backend:

    - **Base de Datos:** Configura una base de datos MySQL llamada `movies-codo` con la estructura adecuada para almacenar la información de usuarios.
   
    - **Tomcat:** Configura Tomcat en tu entorno de desarrollo o servidor para desplegar el backend.

    - **Variables de Entorno:** Asegúrate de configurar las variables de entorno necesarias, como la URL de conexión a la base de datos y otros parámetros específicos.

    - Importa el proyecto en tu IDE Java preferido.

    - Configura las dependencias en el archivo pom.xml:
    
        ```bash
        <dependencies>
            <!-- Otras dependencias -->
            <dependency>
                <groupId>com.mysql</groupId>
                <artifactId>mysql-connector-j</artifactId>
                <version>9.0.0</version>
            </dependency>
            <dependency>
                <groupId>jakarta.servlet</groupId>
                <artifactId>jakarta.servlet-api</artifactId>
                <version>5.0.0</version>
            </dependency>
            <dependency>
                <groupId>com.fasterxml.jackson.core</groupId>
                <artifactId>jackson-databind</artifactId>
                <version>2.17.1</version>
            </dependency>
            <dependency>
                <groupId>com.fasterxml.jackson.datatype</groupId>
                <artifactId>jackson-datatype-jsr310</artifactId>
                <version>2.17.1</version>
            </dependency>
            <!-- Otras dependencias -->
        </dependencies>
        ```
    
    - Ejecuta la aplicación desde tu entorno de desarrollo o despliégala en tu servidor Tomcat.
  
  3. Configuración del Frontend:

      Abre el archivo index.html directamente en tu navegador o inicia un servidor web local si es necesario.
      Asegúrate de que el frontend se comunique con las URL correctas del backend (configuradas en archivos JavaScript).
      Ejecución:
    
      Inicia tu servidor Apache Tomcat u equivalente.
      Accede a la aplicación desde el navegador usando la URL proporcionada por el servidor local (por ejemplo, http://localhost:8080/webapp).

## Demostración
[![Video Demostración](https://github.com/user-attachments/assets/9c7c0a16-9bea-4dd9-a32b-a1451287c25b)](https://www.youtube.com/watch?v=PGc2zVXCcYQ)
https://www.youtube.com/watch?v=PGc2zVXCcYQ

![Captura de pantalla 2024-05-30 134743](https://github.com/albelizGH/codo_peliculas/assets/129092769/e6eba4a1-bad1-4139-8c17-52e452a9ff33)

## Autor
  Beliz Alejo

