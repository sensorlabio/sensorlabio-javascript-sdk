class ApiResponse {
    constructor(success, status, code, message = null, token = null) {
        this.success = success;
        this.status = status;
        this.code = code;
        this.message = message;
        this.token = token;
    }
}

module.exports = ApiResponse;