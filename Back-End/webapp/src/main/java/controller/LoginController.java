package controller;

import java.io.IOException;

import dto.LoginVerificadoDTO;
import dto.UserLogInDTO;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import service.UsuarioService;
import util.JsonUtils;

@WebServlet("/login")
public class LoginController extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        UserLogInDTO usuario = JsonUtils.fromJson(req.getInputStream(), UserLogInDTO.class);

        String email = usuario.getEmail();
        String contrasenia = usuario.getContrasenia();

        UsuarioService service = new UsuarioService();
        LoginVerificadoDTO autenticado = service.autenticarUsuario(email, contrasenia);



        resp.getWriter().println(JsonUtils.toJson(autenticado));
    }
}
