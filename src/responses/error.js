/**
 * @classdesc
 */
export default class ApiErrorResponseException {
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
         * @member ApiErrorResponseException#status
         * @type {number}
         */
        this.status = status;

        /**
         * Response/error message
         *
         * @member ApiErrorResponseException#message
         * @type {string}
         */
        this.message = message;

        /**
         * Validation errors.
         *
         * @member ApiErrorResponseException#errors
         * @type {Array}
         */
        this.errors = errors;
    }
}