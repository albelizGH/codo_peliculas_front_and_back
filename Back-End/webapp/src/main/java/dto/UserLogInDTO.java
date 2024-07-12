package dto;

import model.User;

public class UserLogInDTO {
    String contrasenia;
    String email;

    public UserLogInDTO(){
        
    }

    public UserLogInDTO(User usuario){
        contrasenia=usuario.getContrasenia();
        email=usuario.getEmail();
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public String getEmail() {
        return email;
    }

    
}
