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
        /**
         * @member ApplicationsEndpoint#api
         * @type {SensorlabApi}
         */
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
        return this.api._prepareApiResponse(response, this._successApplicationsListResponse);
    }

    /**
     * Get application by id
     *
     * @method ApplicationsEndpoint#get
     * @param {string} application_id - application_id
     * @returns {Promise.<ApiResponse>}
     */
    async get(application_id) {
        let response = await this.api._makeApiRequest('/v1/applications/' + application_id, 'GET', {}, {}, true);
        return this.api._prepareApiResponse(response, this._successApplicationResponse);
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
        return this.api._prepareApiResponse(response, this._successCreateApplicationResponse);
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
     * @method ApplicationsEndpoint#delete
     * @param {string} application_id - application_id
     * @returns {Promise.<ApiResponse>}
     */
    async delete(application_id) {
        let response = await this.api._makeApiRequest('/v1/applications/' + application_id, 'DELETE', {}, {}, true);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Generate new private api key for application.
     *
     * @method ApplicationsEndpoint#generate_private_api_key
     * @param application_id
     * @returns {Promise<*>}
     */
    async generate_private_api_key(application_id) {
        let response = await this.api._makeApiRequest(
            '/v1/applications/' + application_id + '/private_api_key/generate', 'POST', {}, {}, true);
        return this.api._prepareApiResponse(response, this._successCreateApplicationResponse);
    }

    /**
     * Get application for application token.
     *
     * @method ApplicationsEndpoint#get_self
     * @returns {Promise.<ApiResponse>}
     */
    async get_self() {
        let response = await this.api._makeApiRequest('/v1/applications/self', 'GET', {}, {}, true);
        return this.api._prepareApiResponse(response, this._successApplicationResponse);
    }

    /**
     * Update application for application token.
     *
     * @method ApplicationsEndpoint#update_self
     * @param {string} name - application's name
     * @param {string} description - users's description
     */
    async update_self(name, description = null) {
        let data = {
            'name': name,
            'description': description,
        }
        let response = await this.api._makeApiRequest('/v1/applications/self', 'PATCH', data);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Return success result.
     *
     * @param {SensorlabApi} api
     * @param {object} response
     * @returns {ApplicationsResponse}
     * @private
     */
    _successApplicationsListResponse(api, response) {
        return new ApplicationsResponse(api, response.data);
    }

    /**
     * Return success result.
     *
     * @param {SensorlabApi} api
     * @param {object} response
     * @returns {Application}
     * @private
     */
    _successApplicationResponse(api, response) {
        return new Application(api, response.data);
    }

    /**
     * Return success result.
     *
     * @param {SensorlabApi} api
     * @param {object} response
     * @returns {Application}
     * @private
     */
    _successCreateApplicationResponse(api, response) {
        return new Application(api, response.data.application);
    }
}