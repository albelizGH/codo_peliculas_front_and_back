package controller;

import java.io.IOException;

import dto.UserCreateDTO;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import service.UsuarioService;
import util.JsonUtils;

@WebServlet("/register")
public class CrearUsuarioController extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        UserCreateDTO usuarioNuevo=JsonUtils.fromJson(req.getInputStream(), UserCreateDTO.class);
        UsuarioService service = new UsuarioService();
        service.crearUsuario(usuarioNuevo);
        resp.setStatus(HttpServletResponse.SC_CREATED);
    }
}
