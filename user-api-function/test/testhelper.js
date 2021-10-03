/* istanbul ignore file */
class Res {
  constructor () {
    this.keys = []
    this.status = 200
  }

  setHeader (key, value) {
    this.keys[key] = [value]
  }
}

/**
   * Helper class as replacement of context
   * Only implemented log method, as redirect to console.log
   * And log property
   *
   * @class ContextLogger
   */
class ContextLogger {
  constructor () {
    const self = this
    this.log_messages = []
    this.res = new Res()

    this.log = function (message) {
      throw new Error('Do not use default log level')
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

function countNoOfLogLines (context, text) {
  return context.log_messages.filter(m => m.indexOf(text) >= 0).length
}

module.exports = {
  ContextLogger,
  countNoOfLogLines
}
