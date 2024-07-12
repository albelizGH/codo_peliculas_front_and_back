package util;

import java.io.IOException;
import java.io.InputStream;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

public class JsonUtils {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    static {//Para que reconozca el modulo nuevo que agregue para formatear el LocalDate
        objectMapper.registerModule(new JavaTimeModule());
    }

    public static <T> T fromJson(String json, Class<T> clase) throws IOException {
        return objectMapper.readValue(json, clase);
    }

    public static String toJson(Object obj) throws IOException {
        return objectMapper.writeValueAsString(obj);
    }

     public static <T> T fromJson(InputStream inputStream, Class<T> clase) throws IOException {
        return objectMapper.readValue(inputStream, clase);
    }
}
