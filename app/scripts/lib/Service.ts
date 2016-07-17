/**
 * Simple Singelton Service implementation
 * which will be extended by the other Services like
 * - DataSerivce
 * - TemplateService
 * - ...
 * 
 * @export
 * @class Service
 */
export class Service {

    /**
     * Instance of the Service as singleton
     * 
     * @static
     * @type {Service}
     */
    private static _instance: Service;

    /**
     * Returns the current instance or creates a new
     * one if there isn't already an instance available.
     * 
     * @static
     * @returns {Service} Instance of the current Service
     */
    static getInstance(): Service {
        if (!(this._instance instanceof Service)) {
            this._instance = new this();
        }
        return this._instance;
    }

    /**
     * Naming Wrapper for the getInstance() function
     * because inject sounds cooler.
     * 
     * @static
     * @returns {Service} Instance of the current Service
     */
    static inject(): Service {
        return this.getInstance();
    }
}