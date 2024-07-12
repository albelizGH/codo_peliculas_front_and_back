package controller;

import java.io.IOException;
import dto.UserSelectDTO;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import service.UsuarioService;
import util.JsonUtils;

@WebServlet("/getuserbyemail")
public class ObtenerUsuarioPorEmail extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Obtener el email del parámetro de la solicitud
        String email = req.getParameter("email");

        // Crear una instancia del servicio de usuario
        UsuarioService service = new UsuarioService();

        // Obtener el usuario por email
        UserSelectDTO usuario = service.obtenerUsuarioPorEmail(email);

        // Convertir el usuario a JSON
        String usuarioJSON = JsonUtils.toJson(usuario);

        // Escribir la respuesta JSON
        resp.getWriter().println(usuarioJSON);
    }
}
