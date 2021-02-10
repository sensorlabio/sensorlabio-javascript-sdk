/**
 * User profile
 */
export default class Profile {
  /**
   * @constructor Profile
   * @param {SensorlabApi} api - parent api
   * @param {Object} data - data from response
   */
  constructor(api, data) {
    this.api = api;

    /**
     * User's email
     *
     * @member Profile#email
     * @type {string}
     */
    this.email = data.email;

    /**
     * Is Application Admin or not
     *
     * @member Profile#isApplicationAdmin
     * @type {Boolean}
     */
    this.isApplicationAdmin = data.isApplicationAdmin;

    /**
     * Is admin or not
     *
     * @member Profile#isAdmin
     * @type {Boolean}
     */
    this.isAdmin = data.isAdmin;

    /**
     * Dashboard default application
     *
     * @member Profile#dashboardApplication
     * @type {Object.dashboardApplication}
     */
    this.dashboardApplication = data.dashboardApplication;

    /**
     * Dashboard default measurement type
     *
     * @member Profile#dashboardMeasurementType
     * @type {Object.dashboardMeasurementType}
     */
    this.dashboardMeasurementType = data.dashboardMeasurementType;
  }

  /**
   * Change password for profile/user.
   *
   * @method Profile#change_password
   * @param old_password
   * @param new_password
   * @param new_password_check
   * @returns {Promise.<ApiResponse>}
   */
  async change_password(old_password, new_password, new_password_check) {
    return this.api.profile.change_password(old_password, new_password, new_password_check);
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
    return this.api.profile.dashboard_settings(dashboardApplication, dashboardMeasurementType);
  }
}
