async function run (context, req) {
  context.log.info('INFO - JavaScript HTTP trigger function processed a request.')

  const name = (req.query.name || (req.body && req.body.name))
  let responseMessage = name ? 'Hello, ' + name : '?'


  // Bindingdata
  const idFromUrl = context.bindingData.id
  if(idFromUrl){
    responseMessage = `Id = ${idFromUrl}`
  } else{
    context.log.warn('WARNING - No ID found in URL')
  }

  context.res = {
    body: responseMessage
  }
}

function environmentVariablesExample(){
  //Retrieve environment variables, preferably once at the start of the Function
  const config = getEnvironmentVariables()

  return `${config.sqlDatabaseServer}:${config.sqlDatabasePort}/user=${config.sqlDatabaseUser}`
}

function getEnvironmentVariables () {
  return {
    sqlDatabaseServer: process.env.DBHOST,
    sqlDatabasePort: Number(process.env.DBPORT),
    sqlDatabaseUser: process.env.DBUSER,
  }
}

module.exports = {
  run,
  environmentVariablesExample,
  getEnvironmentVariables
}
