/*
-----------------------------------------------------------------------------
 © Copyright AMIS 2021 - alle rechten voorbehouden
 -----------------------------------------------------------------------------
*/

const { executeTransaction } = require('../common/database')
const { logStart, logFinished, logDebug } = require('../common/logging')
const { getEnvironmentVariables } = require('../common/utils')
const { validateRequest } = require('./validation')

module.exports = async function (context, req) {
  logStart(context.log, 'Create a new user')

  const config = getEnvironmentVariables()
  const newUser = req.body
  let resultBody = {}
  const validatedUser = validateRequest(newUser)
  if (validatedUser) {
    const resp = await executeTransaction({
      logger: context.log,
      config,
      queryText: 'INSERT INTO users(firstname, lastname, prefix, street, houseno, houseno_suffix, postalcode, city, country, phone1, phone2, email1, email2, date_modified) ' +
                 'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id;',
      inputParameters: [
        validatedUser.firstname,
        validatedUser.lastname,
        validatedUser.prefix,
        validatedUser.street,
        validatedUser.houseno,
        validatedUser.houseno_suffix,
        validatedUser.postalcode,
        validatedUser.city,
        validatedUser.country,
        validatedUser.phone1,
        validatedUser.phone2,
        validatedUser.email1,
        validatedUser.email2,
        new Date().toISOString()
      ]
    })
    logDebug(context.log, `Result: ${resp}`)
    resultBody = resp
    context.res.status = 201
  } else {
    context.res.status = 400
    resultBody = {
      error: 'Missing mandatory fields'
    }
  }
  context.res.body = resultBody

  logFinished(context.log, 'Function succesfully completed')
}
