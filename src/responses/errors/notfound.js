import ApiErrorBasicException from "./basic";

/**
 * @class ApiErrorNotFoundException
 * @classdesc SDK will throw this exception on 404 status errors.
 * @extends ApiErrorBasicException
 */
export default class ApiErrorNotFoundException extends ApiErrorBasicException {
}