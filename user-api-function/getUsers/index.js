/*
-----------------------------------------------------------------------------
 © Copyright AMIS 2021 - alle rechten voorbehouden
 -----------------------------------------------------------------------------
*/

const { executeQuery } = require('../common/database')
const { logStart, logFinished, logError, logDebug } = require('../common/logging')
const { getEnvironmentVariables } = require('../common/utils')

module.exports = async function (context, req) {
  logStart(context.log, 'Get list of all users')

  const config = getEnvironmentVariables()
  let resultBody = ''
  try {
    const userlist = await executeQuery({
      logger: context.log,
      config,
      query: 'select * from users'
    })
    resultBody = userlist || []
    logDebug(context.log, `Result: ${userlist}`)
  } catch (error) {
    logError(context.log, 1, `failed to query users: ${error.message}`)
    context.res.status = 500
    resultBody = {
      error: error.message
    }
  }

  context.res.body = resultBody

  logFinished(context.log, 'Function succesfully completed')
}
