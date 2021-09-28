/**
 * Helper class as replacement of context.res
 *
 * @class Res
 */
class Res {
  constructor () {
    this.keys = []
    /** @type {ResponseBody} */
    this.body = null
    this.status = 200
  }

  setHeader (key, value) {
    this.keys[key] = [value]
  }
}

/**
 * @typedef {object} ResponseBody
 * @property {DataObject} data
 */
/**
 * @typedef {object} ResponseObject
 * @property {number} status - HTTP status
 * @property {ResponseBody} body - Response body
 * @property {object} headers - Response header
 */
/**
 * Helper class as replacement of context
 * Only implemented log method, as redirect to console.log
 * And log property
 *
 * @class ContextLogger
 */
class ContextLogger {
  constructor (id) {
    const self = this
    this.res = new Res()
    this.log_messages = []
    this.bindingData = {
      id: id
    }

    this.log = function (message) {
      //throw new Error('Do not use default log level')
    }

    this.log.info = function (msg) {
      self.log_messages.push(msg)
    }

    this.log.warn = function (msg) {
      self.log_messages.push(msg)
    }

    this.log.error = function (msg) {
      self.log_messages.push(msg)
    }
  }
}

module.exports = {
  ContextLogger
}

