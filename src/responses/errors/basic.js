export default class ApiErrorBasicException {
    /**
     * @constructor ApiErrorResponseException
     *
     * @param {number} status - HTTP status of response.
     * @param {string} message - error message
     * @param {[]} errors - validation errors
     */
    constructor(status, message = null, errors = []) {
        /**
         * HTTP status of response
         *
         * @member ApiErrorResponseBasicException#status
         * @type {number}
         */
        this.status = status;

        /**
         * Response/error message
         *
         * @member ApiErrorResponseBasicException#message
         * @type {string}
         */
        this.message = message;

        /**
         * Validation errors.
         *
         * @member ApiErrorResponseBasicException#errors
         * @type {Array}
         */
        this.errors = errors;
    }
}