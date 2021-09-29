/*
-----------------------------------------------------------------------------
 © Copyright AMIS 2021 - alle rechten voorbehouden
 -----------------------------------------------------------------------------
*/

const { Pool } = require('pg')
const { logDebug } = require('./logging')

let pool

/**
 * Execute a query against the database
 *
 * @param {object} params
 * @param {object} params.logger - reference to context.log
 * @param {import('./utils').ApplicationConfiguration} params.config - Application configuration
 * @param {string} params.query - The query to be executed
 * @param {Array} [params.parameters] - The optional arguments if used in query
 */
const executeQuery = async ({ logger, config, query, parameters = [] }) => {
  createPool(config)
  const client = await pool.connect()
  try {
    logDebug(logger, `Executing query: ${query}. Parameters: ${parameters.join(',')}`)
    const res = await client.query(query, parameters)
    return res.rows
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release()
  }
}

/**
 * Execute a query against the database within a transaction
 *
 * @param {object} params
 * @param {object} params.logger - reference to context.log
 * @param {import('./utils').ApplicationConfiguration} params.config - Application configuration
 * @param {string} params.queryTest - The query to be executed
 * @param {Array} [params.inputParameters] - The optional arguments if used in query
 */
const executeTransaction = async ({ logger, config, queryText, inputParameters }) => {
  createPool(config)
  const client = await pool.connect()
  try {
    logDebug(logger, `Executing query: ${queryText}. Parameters: ${inputParameters.join(',')}`)
    const res = await client.query(queryText, inputParameters)
    await client.query('COMMIT')
    return res.rows[0]
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release()
  }
}

/**
 *
 * @param {import('./utils').ApplicationConfiguration} config - Application configuration
 */
const createPool = (config) => {
  if (!pool) {
    const poolOptions = {
      user: config.dbUser,
      password: config.dbUserPassword,
      host: config.dbHost,
      database: config.dbDatabase,
      port: config.dbPort,
      ssl: config.useSSL,
      application_name: config.applicationName
    }
    pool = new Pool(poolOptions)
  }
}

module.exports = {
  executeQuery,
  executeTransaction
}
