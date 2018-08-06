import ApiErrorBasicException from "./basic";

/**
 * @class ApiErrorValidationException
 * @classdesc SDK will throw this exception on 422 status (fields validation).
 * @extends ApiErrorBasicException
 */
export default class ApiErrorValidationException extends ApiErrorBasicException {
}