/**
 * @typedef {Object} ApplicationConfiguration
 * @property {string} dbHost - hostname of PostgreSQL, settings: DBHOST
 * @property {string} dbPort - port of PostgreSQL, settings: DBPORT
 * @property {string} dbUser - user to connect with to PostgreSQL, settings: DBUSER
 * @property {string} dbUserPassword - password of the connected user, setting: DBPASSWORD
 * @property {string} dbDatabase - database name, setting: DBNAME
 * @property {string} applicationName - setting: WEBSITE_SITE_NAME
 * @property {boolean} useSSL - Should SSL be used? On localhost no SSL
 */

/**
 * Create function configuration object containing all environment settings
 *
 * @returns {ApplicationConfiguration}
 */
function getEnvironmentVariables () {
  return {
    dbHost: process.env.DBHOST,
    dbPort: Number(process.env.DBPORT || 5432),
    dbUser: process.env.DBUSER,
    dbUserPassword: process.env.DBPASSWORD,
    dbDatabase: process.env.DBNAME,
    applicationName: process.env.WEBSITE_SITE_NAME || 'unknown',
    useSSL: !(process.env.DBHOST.toLowerCase() === 'localhost')
  }
}

module.exports = { getEnvironmentVariables }
