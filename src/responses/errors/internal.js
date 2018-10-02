import ApiErrorBasicException from "./basic";

/**
 * @class ApiErrorInteralException
 * @classdesc SDK will throw this exception on 500 status errors.
 * @extends ApiErrorBasicException
 */
export default class ApiErrorInternalException extends ApiErrorBasicException {
}