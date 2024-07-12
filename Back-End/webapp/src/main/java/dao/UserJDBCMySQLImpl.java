package dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import dto.LoginVerificadoDTO;
import dto.UserCreateDTO;
import dto.UserUpdateDTO;
import model.User;

public class UserJDBCMySQLImpl implements UserDAO {

    @Override
    public void create(UserCreateDTO user) {
        String sql="INSERT INTO users (nombre, apellido, email, contrasenia, fecha_nacimiento, pais) VALUES (?,?,?,?,?,?) ";
        Connection connection=null;
        PreparedStatement statement = null;

        try{
            connection=AdministradorDeConexiones.conectar();
            statement=connection.prepareStatement(sql);
            
            statement.setString(1,user.getNombre());
            statement.setString(2,user.getApellido());
            statement.setString(3,user.getEmail());
            statement.setString(4,user.getContrasenia());
            statement.setDate(5,java.sql.Date.valueOf(user.getFechaNacimiento()));
            statement.setString(6,user.getPais());
            
            statement.executeUpdate();

        }catch(Exception e){
            System.out.println("Error al dar de alta el usuario, "+e.getMessage());
        }finally{
            AdministradorDeConexiones.desconectar(connection);
        }
    }

    @Override
    public void delete(Long id) {
        String sql = "DELETE FROM users WHERE id = ?";
        Connection connection = null;
        PreparedStatement statement = null;

        try {
            connection = AdministradorDeConexiones.conectar();
            statement = connection.prepareStatement(sql);
            statement.setLong(1, id);
            statement.executeUpdate();
        } catch (Exception e) {
            System.out.println("Error al borrar el usuario: " + e.getMessage());
            throw new RuntimeException(e);
        } finally {
            AdministradorDeConexiones.desconectar(connection);
        }
    }

    public User getById(Long id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        User user = null;

        try {
            connection = AdministradorDeConexiones.conectar();
            statement = connection.prepareStatement(sql);
            statement.setLong(1, id);
            resultSet = statement.executeQuery();

            if (resultSet.next()) {
                Long idUsuario = resultSet.getLong("id");
                String nombre = resultSet.getString("nombre");
                String apellido = resultSet.getString("apellido");
                String email = resultSet.getString("email");
                String contrasenia = resultSet.getString("contrasenia");
                LocalDate fechaNacimiento = resultSet.getDate("fecha_nacimiento").toLocalDate();
                String pais = resultSet.getString("pais");
                boolean administrador = resultSet.getBoolean("administrador");

                user = new User(idUsuario, nombre, apellido, email, contrasenia, fechaNacimiento, pais, administrador);
            }
        } catch (Exception e) {
            System.out.println("Error al obtener el usuario por ID: " + e.getMessage());
        } finally {
            AdministradorDeConexiones.desconectar(connection);
        }

        return user;
    }

    @Override
    public List<User> findAll() {
        String sql = "SELECT * FROM users";
        List<User> usuarios = new ArrayList<>();
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;

        try {
            connection = AdministradorDeConexiones.conectar();
            statement = connection.prepareStatement(sql);
            resultSet = statement.executeQuery(sql);

            while (resultSet.next()) {
                User usuario;
                Long idUsuario = resultSet.getLong(1);
                String nombre = resultSet.getString(2);
                String apellido = resultSet.getString(3);
                String email = resultSet.getString(4);
                String contrasenia = resultSet.getString(5);
                LocalDate fechaNacimiento = resultSet.getDate(6).toLocalDate();
                String pais = resultSet.getString(7);
                boolean administrador = resultSet.getBoolean(8);

                usuario = new User(idUsuario, nombre, apellido, email, contrasenia, fechaNacimiento, pais,
                        administrador);
                usuarios.add(usuario);
            }
        } catch (Exception e) {
            System.out.println("Error, no se puede listar los usuarios, " + e.getMessage());
        } finally {
            AdministradorDeConexiones.desconectar(connection);
        }
        return usuarios;
    }

    @Override
public LoginVerificadoDTO login(String email, String contrasenia) {
    String sql = "SELECT * FROM users WHERE email = ? AND contrasenia = ?";
    Connection connection = null;
    PreparedStatement statement = null;
    ResultSet resultSet = null;

    try {
        connection = AdministradorDeConexiones.conectar();
        statement = connection.prepareStatement(sql);
        statement.setString(1, email);
        statement.setString(2, contrasenia);
        resultSet = statement.executeQuery();

        if (resultSet.next()) {
            Long idUsuario = resultSet.getLong("id");
            String nombre = resultSet.getString("nombre");
            String apellido = resultSet.getString("apellido");
            String emailUsuario = resultSet.getString("email");
            String contraseniaUsuario = resultSet.getString("contrasenia");
            LocalDate fechaNacimiento = resultSet.getDate("fecha_nacimiento").toLocalDate();
            String pais = resultSet.getString("pais");
            boolean administrador = resultSet.getBoolean("administrador");

            // Construir el DTO de autenticación con los datos obtenidos
            return new LoginVerificadoDTO(true, administrador);
        } else {
            // Si no se encontró ningún usuario con esas credenciales
            return new LoginVerificadoDTO(false, false);
        }
    } catch (Exception e) {
        System.out.println("Error al autenticar el usuario: " + e.getMessage());
        return new LoginVerificadoDTO(false, false);
    } finally {
        AdministradorDeConexiones.desconectar(connection);
    }
}


    @Override
    public void update(UserUpdateDTO user) {
        StringBuilder sql = new StringBuilder("UPDATE users SET ");
        List<Object> params = new ArrayList<>();
        
        if (user.getNombre() != null) {
            sql.append("nombre = ?, ");
            params.add(user.getNombre());
        }
        if (user.getApellido() != null) {
            sql.append("apellido = ?, ");
            params.add(user.getApellido());
        }
        if (user.getEmail() != null) {
            sql.append("email = ?, ");
            params.add(user.getEmail());
        }
        if (user.getContrasenia() != null) {
            sql.append("contrasenia = ?, ");
            params.add(user.getContrasenia());
        }
        if (user.getFechaNacimiento() != null) {
            sql.append("fecha_nacimiento = ?, ");
            params.add(Date.valueOf(user.getFechaNacimiento()));
        }
        if (user.getPais() != null) {
            sql.append("pais = ?, ");
            params.add(user.getPais());
        }
        
        // Remove the last comma and space
        sql.setLength(sql.length() - 2);
        sql.append(" WHERE id = ?");
        params.add(user.getId());
    
        Connection connection = null;
        PreparedStatement statement = null;
    
        try {
            connection = AdministradorDeConexiones.conectar();
            statement = connection.prepareStatement(sql.toString());
    
            for (int i = 0; i < params.size(); i++) {
                statement.setObject(i + 1, params.get(i));
            }
    
            statement.executeUpdate();
        } catch (Exception e) {
            System.out.println("Error, no se puede actualizar el usuario, " + e.getMessage());
        } finally {
            AdministradorDeConexiones.desconectar(connection);
        }
    }

    public User getByEmail(String email){
        String sql = "SELECT * FROM users WHERE email = ?";
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        User user = null;

        try {
            connection = AdministradorDeConexiones.conectar();
            statement = connection.prepareStatement(sql);
            statement.setString(1, email);
            resultSet = statement.executeQuery();

            if (resultSet.next()) {
                Long idUsuario = resultSet.getLong("id");
                String nombre = resultSet.getString("nombre");
                String apellido = resultSet.getString("apellido");
                String emailUsuario = resultSet.getString("email");
                String contrasenia = resultSet.getString("contrasenia");
                LocalDate fechaNacimiento = resultSet.getDate("fecha_nacimiento").toLocalDate();
                String pais = resultSet.getString("pais");
                boolean administrador = resultSet.getBoolean("administrador");

                user = new User(idUsuario, nombre, apellido, emailUsuario, contrasenia, fechaNacimiento, pais, administrador);
            }
        } catch (Exception e) {
            System.out.println("Error al obtener el usuario por email: " + e.getMessage());
        } finally {
            AdministradorDeConexiones.desconectar(connection);
        }

        return user;
    }

    }
    

