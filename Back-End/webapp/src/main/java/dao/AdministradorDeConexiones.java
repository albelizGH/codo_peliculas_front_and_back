package dao;

import java.sql.Connection;
import java.sql.DriverManager;

public class AdministradorDeConexiones {

    public static Connection conectar(){
        String url="jdbc:mysql://localhost:3306/movies-codo?serverTimeZone=UTC&userSSL=false";
        String user="root";
        String password=System.getenv("DB_PASSWORD");
        String driver="com.mysql.cj.jdbc.Driver";
        Connection connection = null;

         try{
            Class.forName(driver);
            connection = DriverManager.getConnection(url, user, password);
        }catch(Exception e){
            System.out.println("No se pudo conectar a la db, "+e.getMessage());
        }
        return connection;
    }

    public static void desconectar(Connection connection){
        try{
            connection.close();
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
    }

}
