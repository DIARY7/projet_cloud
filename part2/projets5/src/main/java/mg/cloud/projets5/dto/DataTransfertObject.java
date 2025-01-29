package mg.cloud.projets5.dto;

import lombok.Data;

@Data
public class DataTransfertObject {
    private String status;
    private int code;
    private Object data;
    private Object error;
    private String message;

    public void success(Object data, String message) {
        setStatus("success");
        setCode(200);
        setData(data);
        setError(null);
        setMessage(message);
    }

    public void error(Object error, String message) {
        setStatus("error");
        setCode(400);
        setData(null);
        setError(error);
        setMessage(message);
    }

    public void notFound(String message) {
        setStatus("not_found");
        setCode(404);
        setData(null);
        setError(null);
        setMessage(message);
    }

    public void serverError(Object error, String message) {
        setStatus("error");
        setCode(500);
        setData(null);
        setError(error);
        setMessage(message);
    }

    public void customResponse(String status, int code, Object data, Object error, String message) {
        setStatus(status);
        setCode(code);
        setData(data);
        setError(error);
        setMessage(message);
    }
}