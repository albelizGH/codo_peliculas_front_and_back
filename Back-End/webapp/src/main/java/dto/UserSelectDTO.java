package dto;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import model.User;

public class UserSelectDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private String fechaNacimiento;
    private String pais;
    private boolean administrador;

    public UserSelectDTO() {

    }

    public UserSelectDTO(User user) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        this.id = user.getId();
        this.nombre = user.getNombre();
        this.apellido = user.getApellido();
        this.email = user.getEmail();
        this.fechaNacimiento = user.getFechaNacimiento().format(formatter);
        this.pais = user.getPais();
        this.administrador = user.isAdministrador();
    }

    public boolean isAdministrador() {
        return administrador;
    }

    @Override
    public String toString() {
        return "UserSelectDTO [id=" + id + ", nombre=" + nombre + ", apellido=" + apellido + ", email=" + email
                + ", fechaNacimiento=" + fechaNacimiento + ", pais=" + pais
                + ", administrador=" + administrador + "]";
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public String getEmail() {
        return email;
    }

    public String getFechaNacimiento() {
        return fechaNacimiento;
    }

    public String getPais() {
        return pais;
    }

}
