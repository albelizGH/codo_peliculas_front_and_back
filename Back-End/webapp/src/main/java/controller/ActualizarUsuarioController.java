package controller;

import java.io.IOException;


import dto.UserUpdateDTO;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import service.UsuarioService;
import util.JsonUtils;

@WebServlet("/updateuser")
public class ActualizarUsuarioController extends HttpServlet {
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        UserUpdateDTO usuarioActualizado = JsonUtils.fromJson(req.getInputStream(), UserUpdateDTO.class);
        UsuarioService service = new UsuarioService();
        service.actualizarUsuario(usuarioActualizado);
        resp.setStatus(HttpServletResponse.SC_OK);
    }
}
