package service;

import java.util.List;
import java.util.stream.Collectors;

import dao.UserDAO;
import dao.UserJDBCMySQLImpl;
import dto.LoginVerificadoDTO;
import dto.UserCreateDTO;
import dto.UserLogInDTO;
import dto.UserSelectDTO;
import dto.UserUpdateDTO;
import model.User;

public class UsuarioService {
    private UserDAO userDAO;

    public UsuarioService(){
        userDAO=new UserJDBCMySQLImpl();
    }

    public void crearUsuario(UserCreateDTO usuario) {
        userDAO.create(usuario);
    }

    public List<UserSelectDTO> listarUsuarios() {
        return userDAO.findAll().stream()
                .map(usuario -> new UserSelectDTO(usuario))
                .collect(Collectors.toList());
    }

    public LoginVerificadoDTO autenticarUsuario(String email, String contrasenia) {
        return userDAO.login(email, contrasenia);
    }

    public void borrarUsuario(Long id) {
        userDAO.delete(id);
    }

    public void actualizarUsuario(UserUpdateDTO user) {
        userDAO.update(user);
    }

    public UserSelectDTO obtenerUsuarioPorEmail(String email) {
        return new UserSelectDTO(userDAO.getByEmail(email));
    }
}
