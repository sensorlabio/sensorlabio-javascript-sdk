/**
 * @classdesc SDK will throw this basic exception on other status errors.
 */
export default class ApiErrorBasicException {
    /**
     * @constructor ApiErrorBasicException
     *
     * @param {number} status - HTTP status of response.
     * @param {string} message - error message
     * @param {array} errors - validation errors
     */
    constructor(status, message = null, errors = []) {
        /**
         * HTTP status of response
         *
         * @member ApiErrorBasicException#status
         * @type {number}
         */
        this.status = status;

        /**
         * Response/error message
         *
         * @member ApiErrorBasicException#message
         * @type {string}
         */
        this.message = message;

        /**
         * Validation errors.
         *
         * @member ApiErrorBasicException#errors
         * @type {Array}
         */
        this.errors = errors;
    }
}