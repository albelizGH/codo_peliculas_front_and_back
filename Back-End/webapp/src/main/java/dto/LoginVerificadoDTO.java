package dto;

public class LoginVerificadoDTO {
    private boolean usuarioYContraseña;
    private boolean admin;

    public LoginVerificadoDTO(boolean usuarioYContraseña, boolean admin) {
        this.usuarioYContraseña = usuarioYContraseña;
        this.admin = admin;
    }

    

    @Override
    public String toString() {
        return "LoginVerificadoDTO [usuarioYContraseña=" + usuarioYContraseña + ", admin=" + admin + "]";
    }



    public boolean isUsuarioYContraseña() {
        return usuarioYContraseña;
    }

    public boolean isAdmin() {
        return admin;
    }
    
}
