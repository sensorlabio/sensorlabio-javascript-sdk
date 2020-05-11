import Profile from '../models/profile';
import ApplicationToken from "../models/application_token";
import Pat from "../models/pat";

/**
 * Class for /profile/* endpoints.
 */
export default class ProfileEndpoints {
  /**
   * @constructor ProfileEndpoints
   * @param {SensorlabApi} api - parent api
   */
  constructor(api) {
    /**
     * @member ProfileEndpoints#api
     * @type {SensorlabApi}
     */
    this.api = api;
  }

  /**
   * Get user's profile.
   *
   * @method ProfileEndpoints#get
   * @returns {Promise.<ApiResponse>}
   */
  async get() {
    let response = await this.api._makeApiRequest('/v1/profile', 'GET', null, null, true);
    return this.api._prepareApiResponse(response, this._successProfileResult);

  }

  /**
   * Change password.
   *
   * @method ProfileEndpoints#change_password
   * @param {string} old_password - current (old) user's password
   * @param {string} new_password - new password to set
   * @param {string} new_password_check - new password check
   * @returns {Promise.<ApiResponse>}
   */
  async change_password(old_password, new_password, new_password_check) {
    let data = {
      'old_password': old_password,
      'new_password': new_password,
      'new_password_check': new_password_check,
    };
    let response = await this.api._makeApiRequest('/v1/profile/change_password', 'POST', data, null, true);
    return this.api._prepareApiResponse(response);
  }

  /**
   * Dashboard settings.
   *
   * @method ProfileEndpoints#dashboard_settings
   * @param {string} dashboardApplication - default dashboard application
   * @param {string} dashboardMeasurementType - default measurement type
   * @returns {Promise.<ApiResponse>}
   */
  async dashboard_settings(dashboardApplication, dashboardMeasurementType) {
    let data = {
      'dashboardApplication': dashboardApplication,
      'dashboardMeasurementType': dashboardMeasurementType
    };
    let response = await this.api._makeApiRequest('/v1/profile/dashboard_settings', 'POST', data, null, true);
    return this.api._prepareApiResponse(response);
  }

  /**
   * Generate Personal Access Token
   *
   * @return {Promise<ApiResponse>}
   */
  async pat_generate() {
    let data = {};
    let response = await this.api._makeApiRequest('/v1/profile/pat/generate', 'POST', data, null, true);
    return this.api._prepareApiResponse(response, this._successPATResult);
  }

  /**
   * Return success result.
   *
   * @param {SensorlabApi} api
   * @param {object} response
   * @returns {Profile}
   * @private
   */
  _successProfileResult(api, response) {
    return new Profile(api, response.data);
  }

  /**
   * Return success result with Personal Access Token.
   *
   * @param {SensorlabApi} api
   * @param {object} response
   * @return {Pat}
   * @private
   */
  _successPATResult(api, response) {
    return new Pat(api, response.data);
  }
}
