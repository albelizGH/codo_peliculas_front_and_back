package controller;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import service.UsuarioService;

@WebServlet("/deleteuser")
public class BorrarUsuarioController extends HttpServlet {
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String idParam = req.getParameter("id");
        Long id = Long.parseLong(idParam);
        UsuarioService service = new UsuarioService();
        service.borrarUsuario(id);

        resp.setStatus(HttpServletResponse.SC_OK);
    
    }
}
