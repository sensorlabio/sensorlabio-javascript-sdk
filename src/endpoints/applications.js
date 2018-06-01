import ApiResponse from '../responses/api';
import ApplicationsResponse from '../responses/applications';
import Application from '../models/application';

/**
 * Class for /application/* endpoints.
 */
export default class ApplicationsEndpoint {
    /**
     * @constructor ApplicationsEndpoint
     * @param {SensorlabApi} api - parent api
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Get applications list
     *
     * @method ApplicationsEndpoint#list
     * @param {object} options - method options
     * @param {number} options.page - page number to display. Default is `1`.
     * @param {string} options.name - search by name.
     * @param {string} options.sort - sorting parameter
     * @returns {Promise.<ApiResponse>}
     */
    async list(options) {
        if (options === undefined) options = {};
        if (options.page === undefined) options.page = 1;
        if (options.name === undefined) options.name = null;
        if (options.sort === undefined) options.sort = null;

        let params = {
            page: options.page,
            name: options.name,
            sort: options.sort,
        }
        let response = await this.api._makeApiRequest('/v1/applications', 'GET', {}, params, true);
        return this._prepareApplicationsListResponse(response);
    }

    /**
     * Get application by id
     *
     * @method MeasurementsEndpoint#last
     * @param {string} application_id - application_id
     * @param {string} type - get measurement with specified type only.
     * @returns {Promise.<ApiResponse>}
     */
    async get(application_id) {
        let response = await this.api._makeApiRequest('/v1/applications/' + application_id, 'GET', {}, {}, true);
        return this._prepareApplicationResponse(response);
    }

    /**
     * Create application.
     *
     * @method ApplicationsEndpoint#create
     * @param {string} name - application's name
     * @param {string} description - users's description
     */
    async create(name, description = null) {
        let data = {
            'name': name,
            'description': description,
        }
        let response = await this.api._makeApiRequest('/v1/applications', 'POST', data);
        return this._prepareApplicationsCreateResponse(response);
    }

    /**
     * Update application.
     *
     * @method ApplicationsEndpoint#update
     * @param {string} application_id - id of application to update
     * @param {string} name - application's name
     * @param {string} description - users's description
     */
    async update(application_id, name, description = null) {
        let data = {
            'name': name,
            'description': description,
        }
        let response = await this.api._makeApiRequest('/v1/applications/' + application_id, 'PATCH', data);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Delete application by id.
     *
     * @method MeasurementsEndpoint#delete
     * @param {string} application_id - application_id
     * @returns {Promise.<ApiResponse>}
     */
    async delete(application_id) {
        let response = await this.api._makeApiRequest('/v1/applications/' + application_id, 'DELETE', {}, {}, true);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Return list of application (or throw error!).
     *
     * @param response
     * @returns {ApiResponse}
     * @throws {ApiResponse}
     * @private
     */
    _prepareApplicationsListResponse(response) {
        if (!response) {
            throw new ApiResponse(false, 0, 0, 'Connection refused');
        }
        if (response.status == 200) { //normal response
            return new ApplicationsResponse(this.api, response.data);
        } else if (response.status == 401) { //401 Unauthorized error
            throw new ApiResponse(false, response.status, 0, response.data);
        } else {
            throw new ApiResponse(false, response.status, 0, response.data.message);
        }
    }

    /**
     * Return application response.
     *
     * @param response
     * @returns {Application}
     * @throws ApiResponse
     * @private
     */
    _prepareApplicationResponse(response) {
        if (!response) {
            throw new ApiResponse(false, 0, 0, 'Connection refused');
        }
        if (response.status == 200) { //normal response
            return new Application(this.api, response.data);
        } else if (response.status == 401) { //401 Unauthorized error
            throw new ApiResponse(false, response.status, 0, response.data);
        } else {
            throw new ApiResponse(false, response.status, 0, response.data.message);
        }
    }

    /**
     * Return list of application (or throw error!).
     *
     * @param response
     * @returns {ApiResponse}
     * @throws {ApiResponse}
     * @private
     */
    _prepareApplicationsCreateResponse(response) {
        if (!response) {
            throw new ApiResponse(false, 0, 0, 'Connection refused');
        }
        switch (response.status) {
            case 200:
                if (response.data.success) {
                    return new Application(this.api, response.data.application);
                } else {
                    throw new ApiResponse(response.data.success, response.status, response.data.code, response.data.message);
                }
                break;
            case 401:
                throw new ApiResponse(false, response.status, 0, response.data);
                break;
            case 422:
                throw new ApiResponse(response.data.success, response.status, response.data.code, response.data.message, response.data.errors);
                break;
            default:
                throw new ApiResponse(false, response.status, 0, response.data.message);
        }
    }
}