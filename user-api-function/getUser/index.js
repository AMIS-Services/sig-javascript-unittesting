/*
-----------------------------------------------------------------------------
 © Copyright AMIS 2021 - alle rechten voorbehouden
 -----------------------------------------------------------------------------
*/

const { executeQuery } = require('../common/database')
const { logStart, logFinished, logError, logDebug } = require('../common/logging')
const { getEnvironmentVariables } = require('../common/utils')

module.exports = async function (context, req) {
  logStart(context.log, `Get user details for id = ${req.params.id}`)

  const config = getEnvironmentVariables()
  const userId = req.params.id
  let resultBody = []
  if (userId) {
    try {
      const user = await executeQuery({
        logger: context.log,
        config,
        query: 'select * from users where id = $1',
        parameters: [userId]
      })
      logDebug(context.log, `Result: ${user}`)
      if (user) {
        resultBody = user
      } else {
        context.res.status = 404
        resultBody = {
          error: 'User not found'
        }
      }
    } catch (error) {
      logError(context.log, 1, `failed to query user: ${error.message}`)
      context.res.status = 500
      resultBody = {
        error: error.message
      }
    }
  } else {
    context.res.status = 412
    resultBody = {
      error: 'Missing user id'
    }
  }
  context.res = {
    body: resultBody
  }

  logFinished(context.log, 'Function succesfully completed')
}
