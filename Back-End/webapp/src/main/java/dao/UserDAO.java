package dao;

import java.util.List;

import dto.LoginVerificadoDTO;
import dto.UserCreateDTO;
import dto.UserSelectDTO;
import dto.UserUpdateDTO;
import model.User;

public interface UserDAO {
    public void create(UserCreateDTO user);
    public void delete(Long id);
    public User getById(Long id);
    public void update(UserUpdateDTO user);
    public List<User> findAll();
    public LoginVerificadoDTO login(String email, String contrasenia);
    public User getByEmail(String email);
}
