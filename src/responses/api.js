/**
 * Default api response for errors
 */
export default class ApiResponse {
    /**
     * @constructor ApiResponse
     *
     * @param {boolean} success
     * @param {number} status
     * @param {number} code
     * @param {string} message
     * @param {string} token
     */
    constructor(success, status, code, message = null, errors = []) {
        /**
         * Response was success or returned with errors
         *
         * @member ApiResponse#success
         * @type {boolean}
         */
        this.success = success;

        /**
         * HTTP status of response
         *
         * @member ApiResponse#status
         * @type {number}
         */
        this.status = status;

        /**
         * Response/error code
         *
         * @member ApiResponse#code
         * @type {number}
         */
        this.code = code;

        /**
         * Response/error message
         *
         * @member ApiResponse#message
         * @type {string}
         */
        this.message = message;

        /**
         * Validation errors.
         *
         * @member ApiResponse#errors
         * @type {Array}
         */
        this.errors = errors;
    }
}