package dto;

import java.time.LocalDate;

public class UserCreateDTO {
    private String nombre;
    private String apellido;
    private String email;
    private String contrasenia;
    private LocalDate fechaNacimiento;
    private String pais;

    public UserCreateDTO(){

    }

    public UserCreateDTO(String nombre, String apellido, String email, String contrasenia, LocalDate fechaNacimiento,
            String pais) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contrasenia = contrasenia;
        this.fechaNacimiento = fechaNacimiento;
        this.pais = pais;
    }

    

    @Override
    public String toString() {
        return "UserCreateDTO [nombre=" + nombre + ", apellido=" + apellido + ", email=" + email + ", contrasenia="
                + contrasenia + ", fechaNacimiento=" + fechaNacimiento + ", pais=" + pais + "]";
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

    public String getContrasenia() {
        return contrasenia;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public String getPais() {
        return pais;
    }

    

    

}
