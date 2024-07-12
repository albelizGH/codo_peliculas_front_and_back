package controller;

import java.io.IOException;
import java.util.List;

import dto.UserSelectDTO;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import service.UsuarioService;
import util.JsonUtils;

@WebServlet("/getusers")
public class ListarUsuariosController extends HttpServlet  {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        UsuarioService service = new UsuarioService();
        List<UserSelectDTO> usuarios = service.listarUsuarios();
        String usuariosJSON = JsonUtils.toJson(usuarios);
        resp.getWriter().println(usuariosJSON);
    }

}
